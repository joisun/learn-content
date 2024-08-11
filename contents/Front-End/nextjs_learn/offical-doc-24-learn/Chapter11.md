---
order: 12
---

## 添加Search 和 Pagination

这章内容是在讲 /invoices 这个页面的搜索和分页是怎么实现的：

![image-20240811202817703](./assets/image-20240811202817703.png)

这里简单总结下怎么实现的：

这是 invoices 页面， 需要用到 query 和 currentPage 这两个props 值去渲染对应的 table。

```tsx
// /app/dashboard/invoices/page.tsx
//...
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> 
      </div>
//...
```

而 这两个参数是怎么构建的呢？ 是组件内部各自实现更新， 这种方式非常值得学习，非常的解耦。 下面看看 Search 这个组件核心逻辑：

```tsx
"use client";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const deHandlerSearch = useDebouncedCallback(handleSearch, 500);

  return (
//...
      <input
        onChange={(e) => deHandlerSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
//...
  );
}
```

防抖监听 input 的 change 事件， 当输入框内容发生变动时，通过 `new URLSearchParams(searchParams)` 这个方法构建一个新的 searchParams 对象。  对象的初始化参数是通过 `useSearchParams()` 这个 hook 返回的当前 searchParams 对象。
然后动态设定 searchParams 对象中的 query 字段值， 然后通过 useRouter() 中的 `replace` 方法，触发当前页面的 URL 地址参数发生变化，触发导航。

导航触发后，`/app/dashboard/invoices/page.tsx` 文件对应的 `/dashboard/invoices` 页面重新渲染，

```tsx
// /app/dashboard/invoices/page.tsx
// ...
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string,
  },
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  const totalPages = await fetchInvoicesPages(query);
```

page.tsx 页面会接收到当前的 searchParams 对象参数， 然后就可以获取到当前的 `query` 搜索关键词，currentPage 则是从当前URL 中获取，如果没有，那么默认就是 1， 然后通过 `fetchInvoicesPages(query)` 这个sql 接口查询当前搜索结果的分页数。传递给 `<Pagination>` 组件去渲染。

而table 组件则单独的根据关键字和当前页面去数据库中取出对应的数据渲染页面：
```tsx
// app/ui/invoices/table.tsx
// ...
export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (//... UI Part)
```

可以看一下 `fetchFilteredInvoices` 方法的 sql 是怎么写的：
```ts
// app/lib/data.ts
//...
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
//...
```

而 `<Pagination>` 这个组件又是怎么实现的， 做了什么事情呢？

> 下方代码经过精简

 Pagination 这个组件做的事情其实很简单， 就是构建需要跳转的 URL， 让后通过 `<Link>` 组件触发跳转。 

那么它是怎么实现的呢？

主要是通过 `useSearchParams()` 这个 hook，获取到当前的 URL searchParams 对象，构建出上一页，下一页，和中间这些数字对应的 Link href 值, 然后当点击这些 Link 的时候，导航到对应的页面。 

> （注意该组件时一个 client component, 因为 hook 只能在客户端组件中使用）

```tsx
"use client";

// ...
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="inline-flex">
        <Link  href={createPageURL(currentPage - 1)}>Left</Link>
        //...
        <Link  href={createPageURL(currentPage - 1)}>Right</Link>
      </div>
    </>
  );
}


// ...

```

你会发现，整个搜素，分页的实现，都是通过构造地址栏的 URL 来实现的。这种方式相当的巧妙，也很优雅。



### 为什么要使用 URL search params ?

以往我们在开发 SPA 应用的时候，都是用 `useState`， `useEffect` 这些hook各种组合，值传递来实现同样的功能。 那么使用 search URL params 这种方式模式有什么好处呢？

- 可以被书签收藏，易于分享： 因为搜素参数，分页参数都在 URL 中，用户可以直接收藏对应的数据查询结果页面，在分享到其他用户的时候也能够页面内容的一致性。 
- 服务端渲染和首次加载： URL 参数可以被服务器直接消费用于渲染初始状态，这使得处理服务端渲染更加容易
- 分析和跟踪：直接在 URL 中进行搜索查询和筛选，可以更轻松地跟踪用户行为，而无需额外的客户端逻辑

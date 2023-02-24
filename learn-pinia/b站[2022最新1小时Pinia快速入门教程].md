https://www.bilibili.com/video/BV1pu411z7e1?spm_id_from=333.337.search-card.all.click&vd_source=1a939f65e5f7333a6191746cf99398dd

[toc]

## 1. 特性

Pinia 具有以下几点特性：

- 直观， 像定义 components 一样地定义 store
- 完整的支持 Typescript 
- 去除 `mutaions` 只有 `state`，`getters`, `actions`
- `actions` 支持同步和异步
- `vue` Devtools 支持 Pinia， 提供更好的开发体验
- 能够构建多个 store, 并实现自动地代码分发
- 极其轻量（1kb）



## 2. install

**install**

```bash
npm install pinia
```

**import**

```ts
// main.ts

import { createApp }  from 'vue';
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')

```

**create store file**

```bash
$ mkdir /src/store
$ touch /src/store/index.ts
```

```ts
// /src/store/index.ts
import { defineStore } from 'pinia';

export default defineStore('main',{
    state:()=>({
        count:10
    })
})
```



## 3. 基本使用

**仓库的使用 - 访问仓库简单示例**

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    const store = useMainStore();

    console.log(store.count);// 10
</script>
```

> :warning: **结构store,将会失去数据响应式**
>
> ```vue
> <!-- 示例： App.vue -->
> <script lang="ts" setup>
>     import { useMainStore } from './store/index';
>     import { storeToRefs } from 'pinia'
>     
>     const store = useMainStore();
> 	//const { count } = store;
>     //console.log(store.count);// 10
>     //这里可以访问 count 初始值，但是不会响应式变化。我们可以通过 storeToRefs 使其响应式变化
>     
>     let { count } = storeToRefs(store)
>     // 但是 在script 中对其值的访问需要通过 `.value` 才能访问到
>    
>     
> </script>
> ```
>
> 

> :notebook: **一点说明：** 
> 从上面的示例中，可以看到， Pinia 在定义数据仓库的时候，是通过 
>
> ```js
> defineStore("store_name",<Store>)
> ```
>
> 这样的方式，并且单独导出。 这也就意味着可以创建多个仓库， 
>
> 在使用的时候，也是引入了单个仓库，这是 Pinia 的模块化设计。



**仓库的使用 - 值的改动**

基本修改方式

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    import { storeToRefs } from 'pinia'
    const store = useMainStore();
    let { count } = storeToRefs(store)
    const handleClick = ()=>{
        count.value++
    }
</script>
<template>
<button @click="handleClick">count++</button>
</template>
```



通过 `$patch` 修改

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    import { storeToRefs } from 'pinia'
    const store = useMainStore();
    let { count } = storeToRefs(store)
    const handleClick = ()=>{
        // 通常用于对多个数据修改
        store.$patch({
            count: store.count++
        })
    }
</script>
<template>
<button @click="handleClick">count++</button>
</template>
```

通过 `$patch` 传入一个回调函数修改

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    import { storeToRefs } from 'pinia'
    const store = useMainStore();
    let { count } = storeToRefs(store)
    const handleClick = ()=>{
        // 通常用于对多个数据修改
        store.$patch((state)=>{
            state.count++
        })
    }
</script>
<template>
<button @click="handleClick">count++</button>
</template>
```



## 4. 重置状态

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    import { storeToRefs } from 'pinia'
    const store = useMainStore();
    let { count } = storeToRefs(store)
    const handleClick = ()=>{
        // 通常用于对多个数据修改
        store.$patch((state)=>{
            state.count++
        })
    }
    
    const handleReset = ()=>{
        store.$reset()// 恢复到仓库初始值
    }
</script>
<template>
<button @click="handleClick">count++</button>
<button @click="handleReset">reset store</button>

</template>
```



## 5. 监听store状态

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    import { storeToRefs } from 'pinia'
    const store = useMainStore();
    let { count } = storeToRefs(store)
    const handleClick = ()=>{
        // 通常用于对多个数据修改
        store.$patch((state)=>{
            state.count++
        })
    }
    
	// 监听整个仓库变化
    store.$subscribe((mutation, state)=>{
        // mutation ： 数据变化的信息，包含修改方式，事件对象(old,new value的描述)，store id信息
        // state
    })
</script>
<template>
<button @click="handleClick">count++</button>
</template>
```



## 6. 计算属性

```ts
// /src/store/index.ts
import { defineStore } from 'pinia';

export default defineStore('main',{
    state:()=>({
        count:10
    }),
    getters:{
     	countSquare:(state)=>{
            return Math.pow(state.count,2)
        }
    }
})
```

访问getters

```vue
<!-- 示例： App.vue -->
<script lang="ts" setup>
    import { useMainStore } from './store/index';
    import { storeToRefs } from 'pinia'
    const store = useMainStore();
    let { count,countSquare } = storeToRefs(store)// 直接在 store 上进行访问
    
    const handleClick = ()=>{
        // 通常用于对多个数据修改
        store.$patch((state)=>{
            state.count++
        })
    }

</script>
<template>
<button @click="handleClick">count++</button>
</template>
```



## 7. action

```ts
// /src/store/index.ts
import { defineStore } from 'pinia';

export default defineStore('main',{
    state:()=>({
        count:10
    }),
    getters:{
     	countSquare:(state)=>{
            return Math.pow(state.count,2)
        }
    },
    actions:{
        // 同步和异步皆可以
        async getData(){
        	const res = await = axios.get('https://www/example.com/api/test');
            // do something related to state
            this.count = res.data.count;// mock example
        }
        
    }
})
```


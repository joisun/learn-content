## Thinking in React

React可以改变你对设计和应用的看法。当您使用React构建用户界面时，首先将其分解为称为组件的部分。然后，您将描述每个组件的不同视觉状态。最后，将组件连接在一起，以便数据流经它们。在本教程中，我们将引导您完成使用React构建可搜索产品数据表的思考过程。

### Start with the mockup

JSON API:

```json
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

MOCKUP looks like:

![img](Thinking in React.assets/s_thinking-in-react_ui.png)

要用 React 实现这个 UI, 你通常需要遵循下面的五个步骤:

### Step1: Break the UI into a component hierarchy(层级)

![img](Thinking in React.assets/s_thinking-in-react_ui_outline.png)

抽离组件层级:

- FilterableProductTable
  - SearchBar
  - ProductTable
    - ProductCategoryRow
    - ProductRow

### Step2: Build a static version in React

### Step 3: Find the minimal but complete representation of UI state 

### Step 4: Identify where your state should live 

### Step 5: Add inverse data flow
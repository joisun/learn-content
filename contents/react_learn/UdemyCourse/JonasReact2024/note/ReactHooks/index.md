## UseReducer

❓ 不是有 useState 吗？为什么还要有 useReducer?
在某些特定场景下，使用 useState 来进行状态管理不太够

1. 当组件中有大量的 state 的时候，会产生很多 event handlers 贯穿组件。
2. 当需要很多状态同时更新的时候
3. 当更新一个状态依赖于一个或多个其他状态时

示例:

```jsx
import { useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {
        case "incremented_age": {
            return {
                name: state.name,
                age: state.age + 1,
            };
        }
        case "changed_name": {
            return {
                name: action.nextName,
                age: state.age,
            };
        }
    }
    throw Error("Unknown action: " + action.type);
}

const initialState = { name: "Taylor", age: 42 };

export default function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleButtonClick() {
        dispatch({ type: "incremented_age" });
    }

    function handleInputChange(e) {
        dispatch({
            type: "changed_name",
            nextName: e.target.value,
        });
    }

    return (
        <>
            <input value={state.name} onChange={handleInputChange} />
            <button onClick={handleButtonClick}>Increment age</button>
            <p>
                Hello, {state.name}. You are {state.age}.
            </p>
        </>
    );
}
```

更多用例：[DOC](https://react.dev/reference/react/useReducer#usage)

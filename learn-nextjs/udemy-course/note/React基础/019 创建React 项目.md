1. 创建项目

   ```bash
   $ npx create-react-app  react-tutorial
   ```

2. 删除src下不必要的文件，仅保留 app.js index.js index.css

   ```bash
   src$ rm -v !("index.css"|"index.js"|"App.js")
   src$ ls
   App.js  index.css  index.js
   ```

3. 初始化所有文件，保持最简内容

   ```bash
   jayce@jayce:src$ cat App.js 
   function App() {
     return <div>Hello!</div>;
   }
   
   export default App;
   jayce@jayce:src$ cat index.js 
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import './index.css';
   import App from './App';
   
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(<App />);
   jayce@jayce:src$ cat index.css 
   jayce@jayce:src$
   ```

4. 项目首次启动

   ```bash
   $ npm start
   ```

   

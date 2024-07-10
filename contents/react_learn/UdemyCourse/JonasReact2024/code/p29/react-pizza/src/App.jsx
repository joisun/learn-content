function Card() {
    return (
        <div className="card">
            <p>Hello</p>
            <p>React!</p>
        </div>
    );
}
export default function App() {
    return (
        <>
            <header>This is header</header>
            <Card />
            {/* 这里使用Card就会创建 Card 这个组件的实例 */}
            <Card />
            <Card />
            <footer>This is footer</footer>
        </>
    );
}

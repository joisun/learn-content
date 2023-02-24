function test() {
  const clickHandler = () => {
    console.log('hello react!');
  };
  return <button onClick={clickHandler}>click</button>;
}

export default test;

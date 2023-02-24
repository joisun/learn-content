import { Route } from 'react-router-dom';
import PageA from './pages/PageA';
import PageB from './pages/PageB';

function App() {
  return (
    <div>
      {/* <nav>
        <ul>
          <li><Link to='/'>Page A</Link></li>
          <li><Link to='/page-b'>Page B</Link></li>
        </ul>
      </nav> */}

      {/* <Switch> */}
      <Route path="/">
        <PageA />
      </Route>
      <Route path="/page-b">
        <PageB />
      </Route>
      {/* </Switch> */}
    </div>
  );
}

export default App;

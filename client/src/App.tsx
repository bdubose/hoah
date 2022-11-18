import logo from './logo.svg';
import './App.css';
import { useGetTestQuery } from './api';

function App() {
  const { data: testObj } = useGetTestQuery();


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with id: {testObj?.id} and message: {testObj?.message}
        </a>
      </header>
    </div>
  );
}

export default App;

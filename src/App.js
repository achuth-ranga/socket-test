import './App.css';
import {ConnectionInputs} from './components/ConnectionInputs'
import {Header} from './components/Header'
import {Menu} from './components/Menu'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Menu></Menu>
      <ConnectionInputs></ConnectionInputs>
      </div>
  );
}

export default App;

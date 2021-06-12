import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import TcpClient from "./components/functionalities/TcpClient";
import { TcpServer } from "./components/functionalities/TcpServer";
import { MqttClient } from "./components/functionalities/MqttClient";
import { MqttServer } from "./components/functionalities/MqttServer";
import { Header } from "./components/navigation/Header";
import { Menu } from "./components/navigation/Menu";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
    <div>
      <Header></Header>
      <Menu></Menu>
      <Router>
        <Switch>
          <Route path="/tcpclient" component={TcpClient} />
          <Route path="/tcpserver" component={TcpServer} />
          <Route path="/mqttclient" component={MqttClient} />
          <Route path="/mqttserver" component={MqttServer} />
          <Redirect to="/tcpclient" />
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;

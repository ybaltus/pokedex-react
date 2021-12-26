import './App.scss';
import {Component} from "react";
import {Header, Routing} from "./components";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <Routing/>
        </div>
    );
  }
}

export default App;

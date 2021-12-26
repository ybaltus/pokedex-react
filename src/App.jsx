import './App.scss';
import {Component} from "react";
import {Container} from "@mui/material";
import {ListPokemon} from './containers';
import {Header} from "./components";

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header/>
            <Container maxWidth="false">
                <ListPokemon />
            </Container>
        </div>
    );
  }
}

export default App;

import logo from './logo.svg';
import './App.scss';
import {Component} from "react";
import {Container} from "@mui/material";
import {ListPokemon} from './containers';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Container maxWidth="false">
                <ListPokemon />
            </Container>
        </div>
    );
  }
}

export default App;

import {Route, Routes} from "react-router-dom";
import {ListPokemon} from "../../containers";

const Routing = () => (
    <Routes>
        <Route path="/" element={<ListPokemon></ListPokemon>} />
    </Routes>
)

export default Routing;


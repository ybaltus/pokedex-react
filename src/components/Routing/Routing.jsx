import {Route, Routes} from "react-router-dom";
import {ListPokemon, DetailPokemon, Favorites} from "../../containers";
import {PageNotFound} from "../index";

const Routing = () => (
    <Routes>
            <Route path="/" element={<ListPokemon></ListPokemon>} />
            <Route path="favoris" element={<Favorites></Favorites>} />
            <Route path="pokemon/:slugName" element={<DetailPokemon></DetailPokemon>} />
            <Route path="*" element={<PageNotFound></PageNotFound>}
        />
    </Routes>
)

export default Routing;


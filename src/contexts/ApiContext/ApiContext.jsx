import {createContext, useState} from "react";

const ApiContext = createContext({});

const ApiProvider = ({children}) => {
    // Hooks
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Parammeters
    const BaseURL = "https://pokeapi.co/api/v2";
    const BaseURLImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back";

    const getPokemonsPerRegion = async (slugName = null) => {
        try{
            const apiUrl = !slugName ? `${BaseURL}/pokedex/kanto` : `${BaseURL}/generation/${slugName}`;
            const response = await(fetch(apiUrl));
            const dataJson = await response.json();
            _initPokemons(dataJson['pokemon_entries']);
            setLoading(false);
        }catch(error) {
            setLoading(false);
            setError(true);
            throw error
        }

    }

    const _initPokemons = (datasJson) => {
        const pokemons = [];
        datasJson.map((pokemon_entry) => {
            const {entry_number, pokemon_species:{name, url: urlSpecie}} = pokemon_entry;
            const urlImage = `${BaseURLImage}/${entry_number}.png`;
            pokemons.push({
                entryNumber: entry_number,
                name: name,
                urlImage: urlImage,
                urlSpecie: urlSpecie
            })
        });
        setPokemons(pokemons);
    };

    return (
        <ApiContext.Provider
            value={{getPokemonsPerRegion, BaseURL, pokemons}}
        >
            {children}
        </ApiContext.Provider>
    )
};

export default ApiContext;
export {ApiProvider};
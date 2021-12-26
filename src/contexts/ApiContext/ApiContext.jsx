import {createContext, useState} from "react";

const ApiContext = createContext({});

const ApiProvider = ({children}) => {
    // Parameters
    const BaseURL = "https://pokeapi.co/api/v2";
    const BaseURLImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    // Hooks
    const [pokemons, setPokemons] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchUrlParam, setSearchUrlParam] = useState("");
    const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getPokemonsPerRegion = async (slugName = null, currentParam = null) => {
        try{
            const apiUrl = !slugName ? `${BaseURL}/pokedex/kanto` : `${BaseURL}/generation/${slugName}`;
            const response = await(fetch(apiUrl));
            const dataJson = await response.json();
            _initPokemons(dataJson['pokemon_entries'], currentParam);
            setLoading(false);
        }catch(error) {
            setLoading(false);
            setError(true);
            throw error
        }
    }

    const _initPokemons = (datasJson, currentParam) => {
        const pokemonsDatas = [];
        datasJson.map((pokemon_entry) => {
            const {entry_number, pokemon_species:{name, url: urlSpecie}} = pokemon_entry;
            const urlImage = `${BaseURLImage}/${entry_number}.png`;
            pokemonsDatas.push({
                entryNumber: entry_number,
                name: name,
                urlImage: urlImage,
                urlSpecie: urlSpecie
            })
        });

        setPokemons(pokemonsDatas);
        if(currentParam !== null) {
            setSearchUrlParam(currentParam);
            setPokemonsFiltered(
                pokemonsDatas.filter((pokemon) => {
                    return pokemon.name.toLowerCase().includes(currentParam.toLowerCase());
                })
            );
        }else{
            setPokemonsFiltered(pokemonsDatas);
        }
    };

    const searchHandler = (value) => {
        setSearchValue(value);
        setPokemonsFiltered(
            pokemons.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
            })
        );
    }

    return (
        <ApiContext.Provider
            value={{
                getPokemonsPerRegion,
                BaseURL,
                pokemonsFiltered,
                searchHandler,
                setSearchValue,
                searchValue,
                searchUrlParam,
                loading
            }}
        >
            {children}
        </ApiContext.Provider>
    )
};

export default ApiContext;
export {ApiProvider};
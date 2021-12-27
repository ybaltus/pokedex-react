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
    const [pokemonsPerType, setPokemonsPerType] = useState([]);
    const [pokemonsFavorites, setPokemonsFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertFavorite, setAlertFavorite] = useState(0);
    const [error, setError] = useState(false);

    const getPokemonsPerRegion = async (slugName = null, currentParam = null) => {
        try{
            const apiUrl = !slugName ? `${BaseURL}/pokedex/kanto` : `${BaseURL}/generation/${slugName}`;
            const response = await(fetch(apiUrl));
            const dataJson = await response.json();
            _initPokemons(dataJson['pokemon_entries'], currentParam);
        }catch(error) {
            console.log(error.message);
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
        setLoading(false);

    };

    const searchHandler = (value) => {
        setSearchValue(value);
        setPokemonsFiltered(
            pokemons.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
            })
        );
    }

    const favoritesHandler = (event) => {
        setLoading(true);
        const entryN = event.target.value;
        let pokemonExist = pokemonsFavorites.filter((pokemon, index) => {
            return parseInt(pokemon.entryNumber) === parseInt(entryN);
        });

        if(pokemonExist.length === 0) {
            pokemonExist = pokemons.filter((pokemon, index) => {
                return parseInt(pokemon.entryNumber) === parseInt(entryN);
            })
            setPokemonsFavorites([pokemonExist[0], ...pokemonsFavorites])
            localStorage.setItem('poke-favorites', JSON.stringify([pokemonExist[0], ...pokemonsFavorites]));
            setAlertFavorite(1)
        } else {
            const keyToRemove = pokemonsFavorites.findIndex((pokemon)=>{
                return parseInt(pokemon.entryNumber) === parseInt(entryN)
            });
            setPokemonsFavorites(pokemonsFavorites.splice(keyToRemove,1));
            localStorage.setItem('poke-favorites', JSON.stringify([...pokemonsFavorites]));
            setAlertFavorite(2);
        }
        setLoading(false);
    }

    const typeHandler = async(typeSelected) => {
        try{
            const apiUrl = `${BaseURL}/type/${typeSelected}`;
            const response = await(fetch(apiUrl));
            const dataJson = await response.json();
            _initPokemonsPerType(dataJson['pokemon']);
        }catch(error) {
            console.log(error.message);
            setLoading(false);
            setError(true);
            throw error
        }
    }

    const _initPokemonsPerType = (datasJson) => {
        setLoading(true);
        const pokemonsDatas = [];
        datasJson.map((pokemon_entry) => {
            const {pokemon:{name, url: urlSpecie}} = pokemon_entry;
            const entry_number = urlSpecie.split('pokemon/')[1];
            const urlImage = `${BaseURLImage}/${entry_number.split('/')[0]}.png`;
            pokemonsDatas.push({
                entryNumber: entry_number,
                name: name,
                urlImage: urlImage,
                urlSpecie: urlSpecie
            })
        });
        setPokemonsPerType(pokemonsDatas);
        setLoading(false);
    };

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
                loading,
                setLoading,
                favoritesHandler,
                pokemonsFavorites,
                setPokemonsFavorites,
                alertFavorite,
                setAlertFavorite,
                pokemonsPerType,
                typeHandler
            }}
        >
            {children}
        </ApiContext.Provider>
    )
};

export default ApiContext;
export {ApiProvider};
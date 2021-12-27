import {TextField} from "@mui/material";
import {useContext, useEffect} from "react";
import {ApiContext} from "../../contexts";
import './PokemonSearch.scss';
import {createSearchParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../index";

const PokemonSearch = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const {
        getPokemonsPerRegion,
        pokemonsFiltered,
        searchHandler,
        loading
    } = useContext(ApiContext);

    useEffect(() => {
        // Initialiser les pokemons
        if(pokemonsFiltered.length === 0) {
            const currentParam = searchParams.get('search');
            getPokemonsPerRegion(null, currentParam);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeSearch = (e) => {
        const value = e.target.value;
        setSearchParams(
            createSearchParams({'search': value})
        );
        searchHandler(value);
    }

    if(loading) {
        return (<Spinner/>)
    }

    return (
        <TextField
            type={"search"}
            className={"searchInput"}
            label="Rechercher un pokemon"
            variant="standard"
            onChange={onChangeSearch}
            defaultValue={searchParams.get('search')}
            size={"normal"}
            inputProps={{ maxLength: 25 }}
        ></TextField>
    )
}



export default PokemonSearch;
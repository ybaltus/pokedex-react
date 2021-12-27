import {TextField} from "@mui/material";
import {useContext} from "react";
import {ApiContext} from "../../contexts";
import './PokemonSearch.scss';
import {createSearchParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../index";

const PokemonSearch = () => {
    const {searchHandler} = useContext(ApiContext);
    let [searchParams, setSearchParams] = useSearchParams();
    const {
        loading
    } = useContext(ApiContext);

    const onChangeSearch = (e) => {
        const value = e.target.value;
        setSearchParams(
            createSearchParams({'search': value})
        );
        setTimeout(() => {
            searchHandler(value);

        }, 800)
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
import {useContext, useEffect} from "react";
import {ApiContext} from "../../contexts";
import {AlertFavorite, PokemonCard, PokemonSearch} from "../../components";
import {Box} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const ListPokemon = () => {
    let [searchParams] = useSearchParams();

    const {pokemonsFiltered, getPokemonsPerRegion} = useContext(ApiContext);

    useEffect(() => {
        // Initialiser les pokemons
        if(pokemonsFiltered.length === 0) {
            const currentParam = searchParams.get('search');
            getPokemonsPerRegion(null, currentParam);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <>
            <h1>Liste des pokémons</h1>
            <PokemonSearch />
            <AlertFavorite/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    m: 5
                }}
            >
                {pokemonsFiltered.map(pokemon =>
                    <PokemonCard
                        key={pokemon.entryNumber}
                        pokemon={pokemon}
                    />
                )}
            </Box>
        </>
    )
}
export default ListPokemon;
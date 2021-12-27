import {useContext} from "react";
import {ApiContext} from "../../contexts";
import {AlertFavorite, PokemonCard, PokemonSearch} from "../../components";
import {Box} from "@mui/material";

const ListPokemon = () => {
    const {pokemonsFiltered} = useContext(ApiContext);

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
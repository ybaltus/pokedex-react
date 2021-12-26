import {useContext, useEffect} from "react";
import {ApiContext} from "../../contexts";
import {PokemonDetails} from "../../components";
import {Box} from "@mui/material";

const ListPokemon = () => {
    const {getPokemonsPerRegion, pokemons} = useContext(ApiContext);

    useEffect(() => {
        // Initialiser les pokemons
        if (pokemons.length === 0) {
            getPokemonsPerRegion();
        }
    }, [])

    return (
        <div>
            <h1>Liste des pokémons</h1>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >
                    {pokemons.map(pokemon =>
                        <PokemonDetails
                            key={pokemon.entryNumber}
                            pokemon={pokemon}
                        />
                    )}
                </Box>
        </div>
    )
}
export default ListPokemon;
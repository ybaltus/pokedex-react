import './Favorites.scss';
import {useContext, useEffect} from "react";
import {ApiContext} from "../../contexts";
import {PokemonCard, Spinner} from "../../components";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";

const Favorites = () => {
    const {favoritesHandler, pokemonsFavorites, setPokemonsFavorites} = useContext(ApiContext);

    useEffect(() => {
        const pokemonsInLocalStorage = localStorage.getItem('poke-favorites');
        if(pokemonsInLocalStorage) {
            setPokemonsFavorites(JSON.parse(pokemonsInLocalStorage));
        }
    }, []);


    if(pokemonsFavorites.length === 0) {
        return (
            <>
                <h1>Vos pokemons favoris</h1>
                <p>Vous n'avez pas de pokemons en favoris.</p>
                <Button href="/" title={"Revenir à l'accueil"}>Revenir à l'accueil</Button>

            </>
        )
    }

    return (
        <>
            <h1>Vos pokemons favoris</h1>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    m: 5
                }}
            >
                {pokemonsFavorites.map(pokemon =>
                    <PokemonCard
                        key={pokemon.entryNumber}
                        pokemon={pokemon}
                        isFavorite={true}
                    />
                )}
            </Box>
        </>
    )
}

export default Favorites;
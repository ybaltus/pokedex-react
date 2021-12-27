import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './PokemonCard.scss';
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts";

const PokemonCard = ({pokemon: {name, urlImage, ...rest}, isFavorite}) => {
    const {favoritesHandler, pokemonsFavorites} = useContext(ApiContext);
    const [textFavorite, setTextFavorite] = useState("Ajouter aux favoris");

    useEffect(() => {
        textFavoriteHandler();
    }, [pokemonsFavorites]);

    const textFavoriteHandler = () => {
        const index = pokemonsFavorites.filter((pokemon)=>{
            return parseInt(pokemon.entryNumber) === parseInt(rest.entryNumber)
        });
        if(index.length === 0) {
            setTextFavorite('Ajouter aux favoris');
        }else{
            setTextFavorite('Retirer des favoris');
        }
    }

    //Vérifier s'il sont en favoris
    return (
        <Card
            className={"pokemon-card"}
            sx={{ width: 300 }}>
            <CardMedia
                component="img"
                height="140"
                image={urlImage}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                { isFavorite ? null :
                    <Button size="small" onClick={favoritesHandler} value={rest.entryNumber} title={textFavorite}>{textFavorite}</Button>}
                <Button href={`/pokemon/${name}`} title={"Voir plus"}>Voir plus</Button>
            </CardActions>
        </Card>
    )
}

export default PokemonCard;
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './PokemonCard.scss';
import {Link} from "react-router-dom";

const PokemonCard = ({pokemon: {name, urlImage, ...rest}}) => {
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
                <Button size="small">Ajouter au favoris</Button>
                <Button href={`/pokemon/${name}`} title={"Voir plus"}>Voir plus</Button>

                {/*<Button size="small">Voir plus</Button>*/}
            </CardActions>
        </Card>
    )
}

export default PokemonCard;
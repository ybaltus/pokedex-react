import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts";
import {Box, Chip, Divider, List, ListItem, ListItemText, Paper} from "@mui/material";
import './DetailsPokemon.scss';

const DetailPokemon = () => {
    let params = useParams();
    const [pokemon, setPokemon] = useState({});
    const {
        BaseURL,
        pokemonsFiltered,
        loading,
        setLoading
    } = useContext(ApiContext);

    useEffect(() => {
        setLoading(true);
        initPokemon();
    }, []);

    const initPokemon = async() => {
        const response = await(fetch(`${BaseURL}/pokemon/${params.slugName}`));
        const dataJson = await response.json();
        const{
            name,
            sprites: {front_default: imagePokemon},
            weight,
            height,
            moves: {0: skill1, 1: skill2, 2: skill3},
            stats,
            types
        } = dataJson;

        setPokemon({
            name,
            imagePokemon,
            weight,
            height,
            skills: [skill1, skill2, skill3],
            stats,
            types
        });
        setLoading(false);
        console.log(dataJson);
    }

    if(loading) {
        return <>
            Chargement en cours
        </>
    }
        return (
            <>
                <h1>Vue détaillé de {pokemon.name}</h1>
                <Box
                    className={"pokemon-details"}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        m: 10,
                    }}
                >
                    <Box className={"details-box"}>
                        <Paper variant="outlined">
                            <img src={pokemon.imagePokemon} alt={pokemon.name}/>
                        </Paper>
                    </Box>
                    <Box className={"details-box"}>
                        <h2>{pokemon.name} <span> </span>
                            {pokemon.types.map(typePoke => {
                               return <Chip label= {typePoke.type.name} className={`chip-color-${typePoke.type.name}`}/>
                            })}
                        </h2>
                        <ul>
                            <li key={'item-weight'}>{"Poid: "+ pokemon.weight}</li>
                            <li key={'item-height'}>{"Taille: "+ pokemon.height}</li>
                        </ul>
                        <Divider/>
                        <h4>Les 3 premières capacités</h4>
                        <ul>
                            {pokemon.skills.map((skill, index) => {
                                return <li key={'item-skill-'+index}>{skill.move.name}</li>
                            })}
                        </ul>
                        <Divider/>
                        <h4>Statistiques</h4>
                        <ul>
                            {pokemon.stats.map((stat, index) => {
                                return <li key={'item-stat-'+index}>{stat.stat.name}: {stat.base_stat}</li>
                            })}
                        </ul>
                    </Box>

                </Box>
            </>
        )


}

export default DetailPokemon;
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../contexts";
import {PokemonCard, Spinner} from "../../components";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import './ListPokemonType.scss';

const ListPokemonType = () => {
    const {pokemonsPerType, typeHandler, loading} = useContext(ApiContext);
    const [typeSelected, setTypeSelected] = useState("normal");

    useEffect(() => {
        typeHandler(typeSelected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (event) => {
        setTypeSelected(event.target.value);
        typeHandler(event.target.value);
    };

    if(loading) {
        return <Spinner/>
    }

    return (
        <>
            <h1>Liste des pokémons par type</h1>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="inputPokemonType">Sélectionner un type de pokemon</InputLabel>
                    <Select
                        labelId="selectPokemonTypeLabel"
                        id="selectPokemonType"
                        value={typeSelected}
                        label="Sélectionner un type de pokemon"
                        onChange={handleChange}
                    >
                        <MenuItem value={"normal"}>Normal</MenuItem>
                        <MenuItem value={"poison"}>Poison</MenuItem>
                        <MenuItem value={"psychic"}>Psychic</MenuItem>
                        <MenuItem value={"grass"}>Grass</MenuItem>
                        <MenuItem value={"ground"}>Ground</MenuItem>
                        <MenuItem value={"ice"}>Ice</MenuItem>
                        <MenuItem value={"fire"}>Fire</MenuItem>
                        <MenuItem value={"rock"}>Rock</MenuItem>
                        <MenuItem value={"dragon"}>Dragon</MenuItem>
                        <MenuItem value={"water"}>Water</MenuItem>
                        <MenuItem value={"bug"}>Bug</MenuItem>
                        <MenuItem value={"dark"}>Dark</MenuItem>
                        <MenuItem value={"fighting"}>Fighting</MenuItem>
                        <MenuItem value={"ghost"}>Ghost</MenuItem>
                        <MenuItem value={"steel"}>Steel</MenuItem>
                        <MenuItem value={"flying"}>Flying</MenuItem>
                        <MenuItem value={"electric"}>Electric</MenuItem>
                        <MenuItem value={"fairy"}>Fairy</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    m: 5
                }}
            >
                {pokemonsPerType.map(pokemon =>
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
export default ListPokemonType;
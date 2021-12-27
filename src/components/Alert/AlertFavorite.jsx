import {Alert} from "@mui/material";
import {useContext} from "react";
import {ApiContext} from "../../contexts";
import './AlertFavorite.scss'
const AlertFavorite = () => {
    const {alertFavorite, setAlertFavorite} = useContext(ApiContext);

    const resetAlert = () => {
        setAlertFavorite(0);
    }

    if(alertFavorite === 1) {
       return <Alert severity="success" onClose={resetAlert} >Le pokémon a été ajouté aux favoris.</Alert>

    }
    if(alertFavorite === 2) {
        return <Alert severity="success" onClose={resetAlert} >Le pokémon a été retiré des favoris.</Alert>
    }

    return (
        <>
        </>
    )
}

export default AlertFavorite;
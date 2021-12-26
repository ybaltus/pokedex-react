import {CircularProgress} from "@mui/material";
import './Spinner.scss';
const Spinner = () => (
    <>
        <CircularProgress />
        <p> Chargement en cours. Veuillez patienter.</p>
    </>
)

export default Spinner;
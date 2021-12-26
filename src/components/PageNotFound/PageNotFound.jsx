import {Box} from "@mui/material";
import Container from "@mui/material/Container";
import './PageNotFound.scss';
const PageNotFound = () => (
    <>
        <Container maxWidth="xl">
            <h1>Page introuvable</h1>
            <Box>
                <p>Oups cette page n'existe pas !</p>
            </Box>
        </Container>
    </>
)

export default PageNotFound;
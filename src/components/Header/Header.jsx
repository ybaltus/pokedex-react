import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Header.scss';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            PokeDex
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink
                                to="/"
                                className={isActive =>
                                    "nav-link" + (!isActive ? "" : "-selected")
                                }
                                title={"Accueil"}
                            >
                                Accueil
                            </NavLink>
                            <NavLink
                                to="/favoris"
                                className={isActive =>
                                    "nav-link" + (!isActive ? "" : "-selected")
                                }
                                title={"Favoris"}
                            >
                                Favoris
                            </NavLink>
                        </Typography>

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header;
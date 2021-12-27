import './ContactMe.scss';
import {Alert, Box, CircularProgress, Modal, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {useRef, useState} from "react";
import emailjs from 'emailjs-com';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const initialFormValues = {
    lastname: "",
    firstname: "",
    email: "y.baltus@ecole-ipssi.net",
    message:"",
    formSubmitted: false,
    success: false
}

const EmailJsIds = {
    USER_ID: `user_1IE2TQCvJp4MzVW1aBCki`,
    SERVICE_ID: `service_o83avl6`,
    TEMPLATE_ID: `template_98m26kb`,
};

const ContactMe = () => {
    const [open, setOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [hideSuccess, setHideSuccess] = useState(true);
    const [hideError, setHideError] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = useState(initialFormValues);
    const form = useRef();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoadingMessage(true);
        // Send email
        emailjs.send(EmailJsIds.SERVICE_ID, EmailJsIds.TEMPLATE_ID, values, EmailJsIds.USER_ID)
            .then((result) => {
                // console.log(result.text);

                setLoadingMessage(false);
                setHideSuccess(false);
            }, (error) => {
                // console.log(error.text);
                setLoadingMessage(false);
                setHideError(false);
            });
    }

    const handleInputValue = (event) => {
        const {name, value} = event.target;
        if(name === 'firstname') {
            setValues({...values, ["firstname"]: value});
        }
        if(name === 'lastname') {
            setValues({...values, ["lastname"]: value});
        }
        if(name === 'email') {
            setValues({...values, ["email"]: value});
        }
        if(name === 'message') {
            setValues({...values, ["message"]: value});
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} title={"Me contacter"}>Me contacter</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form ref={form} onSubmit={handleFormSubmit} className={"formContact"}>
                        <TextField key={"firstname"} name={"firstname"} onChange={handleInputValue} label="Prénom" defaultValue={values.firstname}/>
                        <TextField key={"lastname"} name={"lastname"} onChange={handleInputValue} label="Nom" fullWidth defaultValue={values.lastname}/>
                        <TextField key={"email"} name={"email"} onChange={handleInputValue} label="Email" fullWidth defaultValue={values.email}/>
                        <TextField key={"message"} name={"message"} onChange={handleInputValue}  label="Message" fullWidth multiline rows={5} defaultValue={values.message}/>
                        <Button type="submit" disabled={loadingMessage} title={"Envoyer"}>Envoyer</Button>
                        {loadingMessage ? <CircularProgress id={"spinnerMessage"}/> : null}
                    </form>
                    <Alert severity="success" className={hideSuccess ? "alert-disabled-message": ''}>L'email a été envoyé !</Alert>
                    <Alert severity="error" className={hideError ? "alert-disabled-message": ''}>L'email n'a pas été envoyé </Alert>
                </Box>
            </Modal>
        </div>
    );
}

export default ContactMe;
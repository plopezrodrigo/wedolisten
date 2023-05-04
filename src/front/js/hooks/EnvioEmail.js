import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const EnvioEmail = (form, setMensaje, toggleModal, template) => {

    emailjs.sendForm(process.env.EMAIL_SERVICE_ID, template, form.current, process.env.EMAIL_PUBLIC_KEY)
        .then((result) => {
            setMensaje("En breves, recibirás noticias nuestras");
            toggleModal();
        }, (error) => {
            setMensaje(error.text)
            toggleModal();
        });
};
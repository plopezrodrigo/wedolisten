import { useRef } from 'react';
//import emailjs from '@emailjs/browser';

export const EnvioEmail = (datos) => {
    const form = useRef();

    emailjs.sendForm(process.env.SERVICE_ID, process.env.TEMPLATE_ID, form.current, process.env.PUBLIC_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
                });
};
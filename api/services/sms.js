const axios = require('axios');
const dataLogin = {
    grant_type: "password",
    username: "Integracion_API@sagicc.co",
    password: "rrLa2CMKe4yGJMsy",
    client_id: "2",
    client_secret: "zt33ghl6SjySDeUCOUGG1LepNwmfYro5zZscOH3K"
}

module.exports = {

    login: () => {
        return axios.post('https://fintra.sagicc.co/oauth/token', dataLogin)
    },


    sendSms(contact, code, token) {
        const data = {
            "canal_id": "31",
            "contacto": contact,
            "mensaje": code + " es el codigo para actualizar tus datos en Fintra"
        }
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }

        const options = {
            method: 'POST',
            headers,
            data,
            url: 'https://fintra.sagicc.co/api/accion/mensaje/nuevo',
        };

        return axios(options)
    }

}

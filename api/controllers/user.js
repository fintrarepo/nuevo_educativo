const express = require('express');
const router = express.Router();
const db = require('../db')
const sql = require('../sql')
const sms = require('../services/sms')
// define the home page route
router.post('/', (req, res) => {

    const nit = req.query.nit;

    db.client.query(sql.GET_CLIENT, [nit],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(result.rows)
        })

});


router.post('/isMydata', (req, res) => {
    db.client.query(sql.GET_CLIENT, [req.body.nit],
        (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
            const userData = result.rows[0]
            db.client.query(sql.INSERT_TEMP, [userData.nomcli, userData.email, userData.telcontacto, userData.nit, userData.direccion, userData.coddpto, userData.ciudad, userData.barrio],
                (err_insert, result) => {
                    if (err_insert) {
                        return res.status(500).send(err)
                    }
                    res.json(result)
                })
        })
})



router.post('/:identification/sendsms', (req, res) => {

    sms.login()
        .then(response => {
            const authSagicc = response.data;
            const code = Math.floor(Math.random() * 1000000);

            setCode(req.params.identification, code, function (errDb, result) {

                if (errDb) return res.status(400).send(errDb);

                sms.sendSms(req.body.phone, code, authSagicc.access_token)
                    .then(data => {
                        //console.log(data)
                        res.json({})
                    }).catch(err => {
                        res.status(400).send(err)
                    })
            })

        }).catch(err => {
            res.status(400).send(err)
        })

})


router.post('/update', (req, res) => {

    const body = req.body;
    const identification = req.body.nit;

    // db.client.query(sql.GET_CODE, [body.nit, body.code], (err, data) => {
    //     if (err) return res.status(500).send(err)
    //     console.log('1')
    //     if (data.rows.length == 0) return res.status(400).send("Not found id");
    //     console.log('2')
    //     const code_validation = data.rows[0].codigo;

    //     if (code_validation != body.code) return res.status(401).send("El codigo es incorrecto");
    //     console.log('3')
    const code_validation = body.code;
    const userInfo = {
        coddpto: body.coddpto,
        ciudad: body.ciudad,
        direccion: body.direccion,
        telcontacto: body.telcontacto,
        barrio: body.barrio
    }

    console.log([identification, userInfo.direccion, userInfo.telcontacto, userInfo.barrio, userInfo.coddpto, userInfo.ciudad, code_validation])

    db.client.query(sql.UPDATE_CLIENT, [identification, userInfo.direccion, userInfo.telcontacto, userInfo.barrio, userInfo.coddpto, userInfo.ciudad, code_validation], (err, result) => {
        if (err) return res.status(500).json(err)
        console.log('4')
        const response_code = result.rows[0].as_actualizar_clientes;

        console.log(response_code)
        if (response_code == "404") {
            return res.status(400).json({
                message: "El cliente no existe"
            })
        }

        if (response_code == "403") {
            return res.status(400).json({
                message: "El codigo es invalido"
            })
        }

        if (response_code == "200") {
            return res.json({})
        }

        return res.status(500).json({
            message: "Error inesperado, intentelo nuevamente"
        })

    })

    // })
})




function setCode(user, code, callback) {
    db.client.query(sql.SET_CODE, [code, user], callback)
}

function shouldAbort(err, res) {
    if (err) {
        console.error('Error in transaction', err.stack)
        db.client.query('ROLLBACK', err => {
            if (err) {
                console.error('Error rolling back client', err.stack)
            }
            // release the client back to the pool
            return res.status(500).json(err)
        })
    }
    return !!err
}



module.exports = router;


// if (shouldAbort(err, res)) return
//             db.client.query(sql.UPDATE_PORTAL_USER, [userInfo.telcontacto, identification], (err, result) => {
//                 if (shouldAbort(err, res)) return

//                 db.client.query(sql.UPDATE_NIT, [userInfo.direccion, userInfo.coddpto, userInfo.ciudad, userInfo.telcontacto, userInfo.barrio, identification], (err, result) => {
//                     if (shouldAbort(err, res)) return

//                     db.client.query(sql.UPDATE_CLIENT, [userInfo.direccion, userInfo.telcontacto, userInfo.ciudad, identification], (err, result) => {
//                         if (shouldAbort(err, res)) return

//                         db.client.query(sql.INSERT_TEMP, [data.rows[0].nombre, data.rows[0].email, userInfo.telcontacto, identification, userInfo.direccion, userInfo.coddpto, userInfo.ciudad, userInfo.barrio], (err, result) => {
//                             if (shouldAbort(err, res)) return

//                             db.client.query('COMMIT', err => {
//                                 if (err) {
//                                     console.error('Error committing transaction', err.stack)
//                                     return res.status(500).json(err)
//                                 }
//                                 res.json({})
//                             })
//                         })


//                     })
//                 })
//             })
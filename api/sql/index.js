module.exports = {
    GET_CLIENT: `SELECT 
                    n.coddpto, 
                    c.nomcli, 
                    c.nit, 
                    c.direccion, 
                    c.telcontacto, 
                    n.e_mail as email, 
                    c.ciudad, 
                    n.barrio 
                FROM cliente c
                    LEFT JOIN nit n ON n.cedula =c.nit 
                WHERE nit =$1 and c.dstrct = 'FINV';`,

    SET_CODE: `INSERT INTO tem.actualizar_usuarios_code
    (cedula, codigo)
    VALUES($2, $1);`,

    GET_CODE: `select * from tem.actualizar_usuarios_code where cedula = $1 and codigo = $2`,

    // UPDATE_PORTAL_USER: `update apicredit.usuarios_portal  set celular = $1,  last_update = now() where identificacion = $2;`,
    // UPDATE_NIT: `update nit set direccion = $1, coddpto = $2 , codciu = $3, celular = $4, barrio = $5, fechaultact = now() where cedula = $6 ;`,
    // UPDATE_CLIENT: `update cliente set direccion = $1, telcontacto = $2 , ciudad = $3 where nit = $4;`,
    // INSERT_TEMP: `INSERT INTO tem.actualizaciones_usuarios
    //     (nombre, email, celular, cedula, direccion, departamento, ciudad, barrio, fecha_creacion)
    //     VALUES($1, $2, $3, $4, $5, $6, $7, $8, now());
    //     `

    UPDATE_CLIENT:`select as_actualizar_clientes($1, $2, $3, $4, $5, $6);`

}
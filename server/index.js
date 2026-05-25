require('dotenv').config();

const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());


// ======================================
// REGISTRO USUARIO
// ======================================

app.post('/registro', async (req, res) => {

    try {

        const { nombre, correo, cedula, password } = req.body;

        const sql = `
            INSERT INTO usuarios(nombre, correo, cedula, password)
            VALUES ('${nombre}', '${correo}', '${cedula}', '${password}')
        `;

        await db.query(sql);

        console.log('Usuario registrado');

        return res.status(200).json({
            success: true,
            mensaje: 'Usuario registrado exitosamente'
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            mensaje: 'Error al registrar usuario'
        });

    }

});


// ======================================
// GET PACIENTES
// ======================================

app.get('/pacientes', (req, res) => {

    const sql = 'SELECT * FROM pacientes';

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        return res.json(result);

    });

});


app.get('/', (req, res) => {
    res.send('API Gestión Salud funcionando');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

// ======================================
// INICIO SESION
// ======================================


// ======================================
// LOGIN
// ======================================

app.post('/login', async (req, res) => {

    try {

        const { correo, password } = req.body;

        const sql = `
            SELECT * FROM usuarios
            WHERE correo='${correo}'
            AND password='${password}'
        `;

        const [result] = await db.query(sql);

        if(result.length > 0){

            return res.status(200).json({
                success: true,
                mensaje: 'Login correcto',
                usuario: result[0]
            });

        } else {

            return res.status(401).json({
                success: false,
                mensaje: 'Correo o contraseña incorrectos'
            });

        }

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            mensaje: 'Error del servidor'
        });

    }

});

// ======================================
// OBTENER CITAS
// ======================================

app.get('/citas', async (req, res) => {

    try {

        const sql = 'SELECT * FROM citas';

        const [result] = await db.query(sql);

        return res.json(result);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            mensaje: 'Error obteniendo citas'
        });

    }

});

// =========================
// CREAR CITA
// =========================

// ======================================
// CREAR CITA
// ======================================

app.post('/citas', async (req, res) => {

    try {

        const {
            paciente_id,
            fecha,
            hora,
            especialidad
        } = req.body;

        const sql = `
            INSERT INTO citas(
                paciente_id,
                fecha,
                hora,
                estado,
                especialidad
            )
            VALUES(
                '${paciente_id}',
                '${fecha}',
                '${hora}',
                'Asignada',
                '${especialidad}'
            )
        `;

        await db.query(sql);

        return res.json({
            success: true,
            mensaje: 'Cita creada'
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            mensaje: 'Error creando cita'
        });

    }

});

// ======================================
// ELIMINAR CITA
// ======================================

app.delete('/citas/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const sql = `
            DELETE FROM citas
            WHERE id = '${id}'
        `;

        await db.query(sql);

        return res.status(200).json({
            success: true,
            mensaje: 'Cita eliminada correctamente'
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            mensaje: 'Error eliminando cita'
        });

    }

});

// ======================================
// OBTENER MEDICAMENTOS
// ======================================

app.get('/medicamentos', async (req, res) => {

    try {

        const sql = `
            SELECT * FROM medicamentos
        `;

        const [result] = await db.query(sql);

        return res.json(result);

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            mensaje: 'Error obteniendo medicamentos'
        });

    }

});

// ======================================
// RESERVAR MEDICAMENTO
// ======================================

// ======================================
// RESERVAR MEDICAMENTO
// ======================================

app.put('/medicamentos/reservar/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const { cantidad } = req.body;

        // BUSCAR MEDICAMENTO
        const sqlBuscar = `
            SELECT * FROM medicamentos
            WHERE id = '${id}'
        `;

        const [medicamento] = await db.query(sqlBuscar);

        // VALIDAR STOCK
        if(medicamento[0].cantidad < cantidad){

            return res.status(400).json({
                success:false,
                mensaje:'No hay suficientes unidades'
            });

        }

        // DESCONTAR
        const sqlActualizar = `
            UPDATE medicamentos
            SET cantidad = cantidad - ${cantidad}
            WHERE id = '${id}'
        `;

        await db.query(sqlActualizar);

        return res.json({
            success:true,
            mensaje:'Medicamento reservado'
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success:false,
            mensaje:'Error reservando medicamento'
        });

    }

});


// ======================================
// ACTUALIZAR USUARIO
// ======================================

app.put('/usuarios/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            correo,
            cedula
        } = req.body;

        const sql = `
            UPDATE usuarios
            SET
                nombre='${nombre}',
                correo='${correo}',
                cedula='${cedula}'
            WHERE id='${id}'
        `;

        await db.query(sql);

        return res.json({
            success:true,
            mensaje:'Usuario actualizado'
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success:false,
            mensaje:'Error actualizando usuario'
        });

    }

});
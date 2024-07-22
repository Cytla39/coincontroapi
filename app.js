
const express = require('express');
const bodyParser = require('body-parser');
const usuarios = require('./services/usuariosServicio');
const egresos = require('./services/egresosServicio');
const ingresos = require('./services/ingresosServicio');

const cors = require('cors');

const app = express();
const port = 8080;
app.use(cors());

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(bodyParser.urlencoded({ extended: false }));

const jsonParser = bodyParser.json();

app.use(express.urlencoded({ extended: true })); // support encoded bodies


app.get('/api/users', async (req, res) => {
    const result = await usuarios.obtenerUsuarios();

    res.json(result);
});


app.get('/api/ingresos', async (req, res) => {
    const result = await ingresos.obtenerIngresos();

    res.json(result);
});

// controlador
app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    const result = await usuarios.obtenerUsuarioPorId(id);

    console.log(result);
    res.json(result);
});

app.get('/api/usuarios/:id/ingresos', async (req, res) => {

    const id = req.params.id;

    const result = await usuarios.obtenerIngresos(id);

    console.log(result);
    res.json(result);
})

app.get('/api/usuarios/:id/egresos', async (req, res) => {

    const id = req.params.id;

    const result = await usuarios.obtenerEgresos(id);

    res.json(result);
})

app.get('/api/usuarios/:id/ingresos', async (req, res) => {

    const id = req.params.id;

    const result = await usuarios.obtenerIngresos(id);

    res.json(result);
});

app.get('/api/egresos', async (req, res) => {
    const result = await egresos.obtenerEgresos();

    res.json(result);
});

app.get('/api/egresos/:id', async (req, res) => {
    const id = req.params.id;

    const result = await egresos.obtenerEgresosPorId(id);

    console.log(result);
    res.json(result);
});

app.delete('/api/egresos/:id', async(req, res) => {
    
    try {
        const result = await egresos.eliminar(req.params.id);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar el egreso");
    }


    res.status(200).json();
});

app.post('/api/egresos', jsonParser, async (req, res) => {

    try {
        const result = await egresos.agregar({
            'monto': req.body.monto,
            'fecha': req.body.fecha,
            'categoria': req.body.categoria,
            'concepto': req.body.concepto,
            'periodoId': req.body.periodoId,
            'usuarioId': req.body.usuarioId
        });
    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar");
    }

    res.status(200).json();
});

app.put('/api/egresos', jsonParser, async(req, res) => {

    try {
        const result = await egresos.actualizar({
            'egresoId': req.body.egresoId,
            'monto': req.body.monto,
            'fecha': req.body.fecha,
            'categoria': req.body.categoria,
            'concepto': req.body.concepto,
            'periodoId': req.body.periodoId,
            'usuarioId': req.body.usuarioId
        });
    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar");
    }
    
    res.status(200).json();
});


app.post('/api/ingresos', jsonParser, async (req, res) => {

    try {
        const result = await ingresos.agregar({
            'monto': req.body.monto,
            'fecha': req.body.fecha,
            'categoria': req.body.categoria,
            'concepto': req.body.concepto,
            'periodoId': req.body.periodoId,
            'usuarioId': req.body.usuarioId

        });

        res.status(201).json();

    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar el ingreso");
    }
});

app.get('/api/ingresos/:id', async (req, res) => {
    const id = req.params.id;


    const result = await ingresos.obtenerIngresosPorId(id);

    console.log(result);
    res.json(result);
});


app.delete('/api/ingresos/:id', async(req, res) => {
    
    try {
        const result = await ingresos.eliminar(req.params.id);
    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar");
    }


    res.status(200).json();
});


app.put('/api/ingresos', jsonParser, async(req, res) => {

    try {
        const result = await ingresos.actualizar({
            'ingresoId': req.body.ingresoId,
            'monto': req.body.monto,
            'fecha': req.body.fecha,
            'categoria': req.body.categoria,
            'concepto': req.body.concepto,
            'periodoId': req.body.periodoId,
            'usuarioId': req.body.usuarioId
        });
    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar");
    }
    
    res.status(200).json();
});

// controlador
app.post('/api/usuarios', jsonParser, async (req, res) => {
try {
    
    if(req.body.contrasena !== req.body.confirmarContrasena) {
        return res.status(400).json("La contraseña no coincide con la confirmación");
    }

    const result = await usuarios.agregar({
        'nombre': req.body.nombre,
        'apellido': req.body.apellido,
        'email': req.body.email,
        'pwd': req.body.contrasena,
        'pwdConfirm': req.body.confirmarContrasena
    });

} catch (error) {
    console.error(error);
    res.status(400).json('Error al registrar usuario');
}

    res.status(201).json();
});


app.delete('/api/usuarios/:id', async (req, res) => {

    try {
        const result = await usuarios.eliminar(req.params.id);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json();
    }
});

app.put('/api/usuarios', jsonParser, async(req, res) => {
    
    try {
        const result = await usuarios.actualizar({
            'usuarioId': req.body.usuarioId,
            'email': req.body.email,
            'nombre': req.body.nombre,
            'apellido': req.body.apellido
        });
    } catch (error) {
        console.error(error);
        res.status(400).json("Error al procesar");
    }
    
    res.status(200).json();
})

app.post('/api/login', jsonParser, async (req, res) => {

    try {
        console.log(`Validando usuario: ${req.body.email}-${req.body.password}`);
        const result = await usuarios.validarUsuario(req.body.email, req.body.password);

        if (result.result) {
            res.status(200).json(result.result);
        } else {
            res.status(400).json("Usuario no válido");

        }
    } catch (error) {
        console.log(error);
        res.status(400).json("Usuario no válido");
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


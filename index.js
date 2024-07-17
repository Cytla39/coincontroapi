
const express = require('express');
const bodyParser = require('body-parser');
const usuarios = require('./services/usuariosServicio');
const egresos = require('./services/egresosServicio');
const ingresos = require('./services/ingresosServicio');

const cors = require('cors');

const app = express();
const port = 3000;
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

app.get('/api/egresos', async (req, res) => {
    const result = await egresos.obtenerEgresos();

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

app.get('/api/egresos/:id', async (req, res) => {
    const id = req.params.id;

    const result = await egresos.obtenerEgresosPorId(id);

    console.log(result);
    res.json(result);
});

app.post('/api/egresos', urlencodedParser, async (req, res) => {
    const result = await egresos.agregar({
        'monto': req.body.monto,
        'fecha': req.body.fecha,
        'categoria': req.body.categoria,
        'concepto': req.body.concepto,
        'periodoId': req.body.periodoId,
        'usuarioId': req.body.usuarioId

    });


    res.status(201).json();
});

app.post('/api/ingresos', jsonParser, async (req, res) => {
    const result = await ingresos.agregar({
        'monto': req.body.monto,
        'fecha': req.body.fecha,
        'categoria': req.body.categoria,
        'concepto': req.body.concepto,
        'periodoId': req.body.periodoId,
        'usuarioId': req.body.usuarioId

    });


    res.status(201).json();
});



app.get('/api/ingresos/:id', async (req, res) => {
    const id = req.params.id;


    const result = await ingresos.obtenerIngresosPorId(id);

    console.log(result);
    res.json(result);
});



// controlador
app.post('/api/users', jsonParser, async (req, res) => {

    const result = await usuarios.agregar({
        'nombre': req.body.nombre,
        'apellido': req.body.apellido,
        'codigo': req.body.codigo,
        'email': req.body.email,
        'pwd': req.body.pwd
    });

    res.status(201).json();
});


app.delete('/api/users/:id', async (req, res) => {

    const result = await usuarios.eliminar(req.params.id);

    res.status(201).json();
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


const db = require('../database/dbConnection');

async function obtenerIngresos() {
    const [result] = await db.execute(`
        SELECT ingreso_id, ingreso_monto, ingreso_fecha, ingreso_categoria, ingreso_concepto, periodo_id, usuario_id FROM coincontrolbd.ingresos`);

    return {
        result
    };
}

async function obtenerIngresosPorId(id) {

    const [result] = await db.execute(
        `SELECT ingreso_id, ingreso_monto, ingreso_fecha, ingreso_categoria, ingreso_concepto, periodo_id, usuario_id FROM coincontrolbd.ingresos WHERE ingreso_id =?` , [id]

    );


    return {
        result

    }
}

async function agregar(ingreso) {
    const [result] = await db.execute(`INSERT INTO ingresos(ingreso_monto, ingreso_fecha, ingreso_categoria, ingreso_concepto, periodo_id ,usuario_id) values(?,?,?,?,?,?)`,
        [ingreso.monto, ingreso.fecha, ingreso.categoria, ingreso.concepto, ingreso.periodoId, ingreso.usuarioId]
    );

    return {
        result
    }
}

module.exports = {
    obtenerIngresos: obtenerIngresos ,
    obtenerIngresosPorId: obtenerIngresosPorId,
    agregar:agregar
}

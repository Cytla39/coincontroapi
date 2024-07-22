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


    const data = result[0];
    const day = data.ingreso_fecha.getDate();
    const month = data.ingreso_fecha.getMonth() + 1;
    const formattedDate = `${data.ingreso_fecha.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    data.ingreso_fecha = formattedDate;

    return data;
}

async function agregar(ingreso) {
    const [result] = await db.execute(`INSERT INTO ingresos(ingreso_monto, ingreso_fecha, ingreso_categoria, ingreso_concepto, periodo_id ,usuario_id) values(?,?,?,?,?,?)`,
        [ingreso.monto, ingreso.fecha, ingreso.categoria, ingreso.concepto, ingreso.periodoId, ingreso.usuarioId]
    );

    return {
        result
    }
}

async function eliminar(id) {
    const [result] = await db.execute(`DELETE FROM ingresos WHERE ingreso_id=?`,
        [id]
    );

    return {
        result
    }
}

async function actualizar(ingreso) {
    const [result] = await db.execute(`UPDATE ingresos SET ingreso_monto=?, ingreso_fecha=?, ingreso_categoria=?, ingreso_concepto=?, periodo_id=? WHERE ingreso_id=? AND usuario_id=?`,
        [ingreso.monto, ingreso.fecha, ingreso.categoria, ingreso.concepto, ingreso.periodoId, ingreso.ingresoId, ingreso.usuarioId]
    );

    return {
        result
    }
}

module.exports = {
    obtenerIngresos: obtenerIngresos ,
    obtenerIngresosPorId: obtenerIngresosPorId,
    agregar:agregar,
    eliminar:eliminar,
    actualizar: actualizar
}

const db = require('../database/dbConnection');

const colorId = 5;

async function obtenerEgresos() {
    const [result] = await db.execute(`
        SELECT egreso_id, egreso_monto, egreso_fecha, egreso_categoria, egreso_concepto, periodo_id , usuario_id
        FROM coincontrolbd.egresos`);

    return {
        result
    };
}

async function obtenerEgresosPorId(id) {

    const [result] = await db.execute(
        `SELECT egreso_id, egreso_monto, egreso_fecha, egreso_categoria, egreso_concepto, periodo_id ,usuario_id
    FROM coincontrolbd.egresos WHERE egreso_id =?` , [id]

    );

    return {
        result

    }
}

async function agregar(egreso) {
    const [result] = await db.execute(`INSERT INTO egresos(egreso_monto, egreso_fecha, egreso_categoria, egreso_concepto, periodo_id ,usuario_id) values(?,?,?,?,?,?)`,
        [egreso.monto, egreso.fecha, egreso.categoria, egreso.concepto, egreso.periodoId, egreso.usuarioId]
    );

    return {
        result
    }
}

module.exports = {
    obtenerEgresos: obtenerEgresos,
    obtenerEgresosPorId: obtenerEgresosPorId,
    agregar: agregar
}
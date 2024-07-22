const db = require('../database/dbConnection');

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

    const data = result[0];
    const day = data.egreso_fecha.getDate();
    const month = data.egreso_fecha.getMonth() + 1;
    const formattedDate = `${data.egreso_fecha.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    data.egreso_fecha = formattedDate;

    return data;
}

async function agregar(egreso) {
    const [result] = await db.execute(`INSERT INTO egresos(egreso_monto, egreso_fecha, egreso_categoria, egreso_concepto, periodo_id ,usuario_id) values(?,?,?,?,?,?)`,
        [egreso.monto, egreso.fecha, egreso.categoria, egreso.concepto, egreso.periodoId, egreso.usuarioId]
    );

    return {
        result
    }
}

async function eliminar(id) {
    const [result] = await db.execute(`DELETE FROM egresos WHERE egreso_id=?`,
        [id]
    );

    return {
        result
    }
}

async function actualizar(egreso) {
    const [result] = await db.execute(`UPDATE egresos SET egreso_monto=?, egreso_fecha=?, egreso_categoria=?, egreso_concepto=?, periodo_id=? WHERE egreso_id=? AND usuario_id=?`,
        [egreso.monto, egreso.fecha, egreso.categoria, egreso.concepto, egreso.periodoId, egreso.egresoId, egreso.usuarioId]
    );

    return {
        result
    }
}

module.exports = {
    obtenerEgresos: obtenerEgresos,
    obtenerEgresosPorId: obtenerEgresosPorId,
    agregar: agregar,
    eliminar: eliminar,
    actualizar: actualizar
}
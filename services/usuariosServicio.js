const db = require('../database/dbConnection');
// const helper = require('../helper');

async function obtenerUsuarioPorId(id){
  //const offset = helper.getOffset(page, config.listPerPage);
  const [result] = await db.execute(
    `SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_email, usuario_contrasena 
    FROM usuarios WHERE usuario_id=?`, [id]
  );

  return {
    result
  }
}

async function validarUsuario(mail, password) {
  
  const [result] = await db.execute(
    `SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_email 
    FROM usuarios WHERE usuario_email=? and usuario_contrasena=?`, [mail, password]
  );

  return {
    result: result[0]
  }
}

async function obtenerUsuarios(){
  const [result] = await db.execute(
    `SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_email, usuario_contrasena 
    FROM usuarios`
  );

  return {
    result
  }
}

async function agregar(user){
    const [result] = await db.execute(`INSERT INTO usuarios(usuario_nombre, usuario_apellido, usuario_email, usuario_contrasena) values(?,?,?,?)`,
        [user.nombre, user.apellido, user.email, user.pwd]
    );

    return {
        result
    }
}

async function actualizar(user){
  const [result] = await db.execute(`UPDATE usuarios SET usuario_nombre=?, usuario_apellido=? WHERE usuario_email=? AND usuario_id=?`,
      [user.nombre, user.apellido, user.email, user.usuarioId]
  );

  return {
      result
  }
}

async function eliminar(id) {
  const [result] = await db.execute(`DELETE FROM usuarios WHERE usuario_id=?`, [id]);

  return {
    result
  };
}

async function obtenerIngresos(id) {
  const [result] = await db.execute(`SELECT ingreso_id, ingreso_monto, ingreso_fecha, ingreso_categoria, ingreso_concepto, periodo_id FROM coincontrolbd.ingresos WHERE usuario_id =?`, [id]);

  result.forEach(element => {
    element.ingreso_fecha = element.ingreso_fecha.toLocaleDateString()
  });

  return {
    result
  };
}

async function obtenerEgresos(id) {
  const [result] = await db.execute(`SELECT egreso_id, egreso_monto, egreso_fecha, egreso_categoria, egreso_concepto, periodo_id , usuario_id
        FROM coincontrolbd.egresos WHERE usuario_id =?`, [id]);

        result.forEach(element => {
          element.egreso_fecha = element.egreso_fecha.toLocaleDateString()
        });

  return {
    result
  };
}

module.exports = {
    obtenerUsuarios: obtenerUsuarios,
    obtenerUsuarioPorId: obtenerUsuarioPorId,
    validarUsuario: validarUsuario,
    agregar: agregar,
    eliminar: eliminar,
    obtenerIngresos: obtenerIngresos,
    obtenerEgresos: obtenerEgresos,
    actualizar: actualizar
}

const db = require('../database/dbConnection');
// const helper = require('../helper');

async function obtenerUsuarioPorId(id){
  //const offset = helper.getOffset(page, config.listPerPage);
  const [result] = await db.execute(
    `SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_codigo, usuario_email, usuario_contrasena 
    FROM usuarios WHERE usuario_id=?`, [id]
  );
//   const data = helper.emptyOrRows(rows);
 // const meta = {page};

  return {
    result//,
    //meta
  }
}

async function obtenerUsuarios(){
  const [result] = await db.execute(
    `SELECT usuario_id, usuario_nombre, usuario_apellido, usuario_codigo, usuario_email, usuario_contrasena 
    FROM usuarios`
  );

  return {
    result
  }
}

async function agregar(user){
    const [result] = await db.execute(`INSERT INTO usuarios(usuario_nombre, usuario_apellido, usuario_codigo, usuario_email, usuario_contrasena) values(?,?,?,?,?)`,
        [user.nombre, user.apellido, user.codigo, user.email, user.pwd]
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

module.exports = {
    obtenerUsuarios: obtenerUsuarios,
    obtenerUsuarioPorId: obtenerUsuarioPorId,
    agregar: agregar,
    eliminar: eliminar
}

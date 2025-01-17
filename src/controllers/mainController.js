const { conn } = require('../db/dbconnect')

module.exports = {

	getListado: async (req, res) => {
		try{
			const [ registros ] = await conn.query(`SELECT * FROM Items`)
			res.json(registros)
		} catch (error) {
			throw error
		} finally{
			conn.releaseConnection()
		}
	},

	crearRegistro: async (req, res)=>{
		//console.log(req.file)
		const sql = `INSERT INTO Items (nombre, precio, descrip) VALUES (?,?,?);`
		const creado = await conn.query(sql, [req.body.item, parseFloat(req.body.precio), req.file.filename])
		//console.log(creado)
		res.redirect('/listado.html')
		/*console.log(req.body)
		res.send(`<h2>Se hizo algo con ${req.body.create} en el create</h2><a href="/dinamic/1">Regresar a la página anterior</a>`)
		res.json(req.body.create)*/
	},

	getModificar: async (req, res) =>{
		const [modificar] = await conn.query(`SELECT * FROM Items WHERE id=?`, req.params.num)
		console.log(modificar)
		res.render('modificar', {
			title: 'Modifico',
			registro: modificar[0]
		})
	},

	actualizar: async (req, res)=>{
		const sql = `UPDATE Items SET nombre = ?, precio = ?, descrip = ? WHERE id = ?`
		const {idActualizar, nombre_actualizar, precio, descripcion} = req.body
		const modificado = await conn.query(sql, [nombre_actualizar, precio, descripcion, idActualizar])
		console.log(modificado)
		res.redirect('/listado.html')
		//res.send(`<h2>Se hizo algo con ${req.body.actualizar} en el update</h2><a href="/dinamic/1">Regresar a la página anterior</a>`)
	},

	eliminar: async (req, res)=>{
		const eliminado = await conn.query(`DELETE FROM Items WHERE id=?`, req.body.idEliminar)
		res.redirect('/listado.html')
		//res.send(`<h2>Se hizo algo con ${req.body.eliminar} en el delete</h2><a href="/dinamic/1">Regresar a la página anterior</a>`)
	},

}
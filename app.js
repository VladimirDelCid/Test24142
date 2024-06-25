/* ***SERVER ESTÁTICO CON EXPRESS (Módulo Externo)*** */
const express = require(`express`)
const override = require('method-override')
const rutas = require('./src/routes/mainRoutes.js')
//const rutasAdmin = require('./src/routes/adminRoutes.js')
const app = express()

const port = 8080 || process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', (__dirname + '/src/views'))

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(override('_metodo'))

app.use('/', rutas)
//app.use('/admin', rutasAdmin) // /admin/loquesea /admin/xyz

app.use((req, res, next) =>{
	res.status(404).send(`<h1 style="color: red">Recurso no encontrado!</h1>`)
})

app.listen(port, () => console.log(`Hola, estoy arriba en el puerto: ${port}`))

/*  ***SERVER ESTÁTICO CON HTTP SERVER (Módulo Nativo)***
const http = require(`http`)
const fs = require(`fs`)

const server = http.createServer((req, res) => {
	const file = fs.readFileSync(__dirname + '/machete.html')
	res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
	res.end(file)
})

server.listen(8080, ()=> console.log(`Servidor arriba en el puerto 8080`)) */

//const nombre = "Vlad"
//console.log(`Hola ${nombre} estoy ejecutando un archivo desde Nodejs`)

//res.end(`<h1 style="color: hotpink">Hola desde el server de prueba de Node!</h1>
//	<p>Estoy enviando ahora un HTML</p>`)
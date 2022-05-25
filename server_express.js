const express = require('express')
const Contenedor = require('./contenedor')

const DBfile = 'products.json'
const app = express()
const contenedor = new Contenedor(DBfile)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080

app.get('/api/products', (req,res)=>{
    const data = contenedor.getAll() 
    res.json(data)
})

app.get('/api/products/random', (req,res)=>{
    const data = contenedor.getAll()
    const item = data[Math.floor(Math.random() * data.length)]
    res.json(item)
})

app.post('/api/products', (req,res)=>{
    const newData = req.body
    const data = contenedor.save(newData) 
    res.send("Se registro satisfactoriamente")
})

const server  = app.listen(PORT, ()=>{
    console.log(`Server http on ${PORT} ...`)
})
server.on('error',error => console.log('error on server',error))
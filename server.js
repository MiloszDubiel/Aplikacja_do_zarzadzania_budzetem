const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bcrypt = require('hash-wasm')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'financeapp'
})
const port = 3001
connection.connect()

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization"
    })
  );

//Dostep do body requesta, pasuje na json
app.use(express.json())

//Endpoint post
app.post('/register', (req, res)=>{
  console.log(req.body)
})

//Nadłsuchiwanie portu 3001
app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`)
})

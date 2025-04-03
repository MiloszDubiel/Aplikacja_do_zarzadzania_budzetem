const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
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
      allowedHeaders: "Content-Type,Authorization",
    })
  );

//Endpoint post
app.get('/', (req, res)=>{
    res.json({status: "Połączono"});
})

//Nadłsuchiwanie portu 3001
app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`)
})

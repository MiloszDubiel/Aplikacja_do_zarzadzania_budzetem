const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
const bcrypt = require('bcryptjs')
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


const salt = new Uint8Array(16);
crypto.getRandomValues(salt);
//Endpointy
app.post('/register', (req, res)=>{
  const {email, password} = req.body
  let sql = "SELECT * FROM users WHERE email = ?"
  connection.query(sql, [email], (err, result)=>{
    if(err)
      res.json({info: err})
    else if([...result].length > 0)
      res.json({info: "Konto istnieje na podany email"})
    else{
      let sql = "INSERT INTO users(email, password) VALUES (?,?)"
      const salt = bcrypt.genSaltSync(10) 
      const hash = bcrypt.hashSync(password, salt)

      connection.query(sql, [email, hash], (err, result)=>{
        if(err)
          res.json({info: err})
        else
          res.json({info: "Pomyślnie zarejstrowano"})
      })
  }})
})

app.post('/login', (req, res)=>{
  const {email, password} = req.body

  let sql = "SELECT * FROM users WHERE email = ?"

  connection.query(sql, [email], (err, result) =>{
    if([...result].length == 0){
      res.json({info: "Konto nie istnieje"})
      return
    }
    let hash = result[0].password
    bcrypt.compare(password, hash).then(resp =>{
      if(resp)
        res.json({info: "Zalogowano", data: result})
      else
        res.json({info: "Niepoprawne hasło"})
    })
  })
})

//Nadłsuchiwanie portu 3001
app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`)
})

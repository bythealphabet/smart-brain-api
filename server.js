const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

const db = knex({
  client: 'pg',
  connection: {
	connectionString: process.env.DATABASE_URL,
  	ssl: true,
  }
});

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.get ('/', (req,res)=>{res.send("Im here and running!")})
app.post('/signin',(req, res)=>{signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleApiCall(req, res)})

const PORT = process.env.PORT || 5000
// const PORT = 3000

app.listen(PORT, ()=>{
	console.log(`app is running on port ${ PORT }`)
})
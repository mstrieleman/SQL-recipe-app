const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cons = require("consolidate");
const dust = require("dustjs-helpers");
const { Client } = require("pg");
const app = express();

// DB Connect
const connectionString = 'postgresql://username:password@localhost:5432/database'
const client = new Client({
  connectionString: connectionString,
})

//Dust Init
app.engine("dust", cons.dust);
app.set("view engine", "dust");
app.set("views", __dirname + "/views");

//Create Public Folder
app.use(express.static(path.join(__dirname, "public")));

//Init Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Route get
app.get('/', (req, res) => {

  //PostgreSQL Connect
  client.connect()

  //PostgreSQL Select & Request
  client.query('SELECT * FROM recipes')
  .then(result => res.render('index', {recipes: result.rows}))
  .catch(error => console.error(error.stack))
})

//Route post
app.post('/add', (req, res) => {

  //Create Insert Query
  const query = {
    text: "INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)",
    values: [req.body.name, req.body.ingredients, req.body.directions]
  }
  client.query(query)
  .catch(error => console.error(error.stack))
  res.redirect('/')
})

//Server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
})

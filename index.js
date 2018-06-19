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

//Route
app.get('/', (req, res) => {

  //PostgreSQL Connect
  client.connect()
  client.query('SELECT * FROM recipes')
  .then(result => res.render('index', {recipes: result.rows}))
  .catch(error => console.error(error.stack))
  // client.end()
})

// if (err) {
//   console.error(err ? err.stack : result.rows[0].message)
// }
    // res.render('index', {recipes: result.rows})

//Server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
})

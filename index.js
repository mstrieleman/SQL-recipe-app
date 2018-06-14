const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cons = require("consolidate");
const dust = require("dustjs-helpers");
const { Pool, Client } = require("pg");
const app = express();

// DB Connect
const connect = 'postgresql://testuser:supersecretpassword@superrealdatabase.server.com:3211/mydb'

//Dust Init
app.engine("dust", cons.dust);
app.set("view engine", "dust");
app.set("views", __dirname + "/views");

//Create Public Folder
app.use(express.static(path.join(__dirname, "public")));

//Init Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Server
const PORT = 3000
app.listen(PORT, => {
  console.log(`Listening on port ${PORT}.`);
})
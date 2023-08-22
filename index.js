const serverless = require("serverless-http");
const express = require("express");
const app = express();

const scheduler = require("./src/controller/scheduler.controller.js");


const db = require("./src/models");
db.sequelize.sync({force: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

// app.get('/test', async function (req, res) {

//   let msg;
//   try {
//     await db.authenticate();
//     db.
//     msg = 'Connection successful'
//   } catch (error) {
//     msg = 'Unable to connect to the database:'
//     console.error('Unable to connect to the database:', error);
//   }
  
//     return res.send(msg)
//   })
  

app.post("/scheduler",scheduler.create)
app.get("/scheduler",scheduler.findAll)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);

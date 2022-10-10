/** @format */
// https://www.w3schools.com/js/js_if_else.asp


//xamp
// run run
// mysql - Admin
const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

//connect to mysql environment

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
  db.query("SHOW DATABASES", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result, "res");
    }
  });
});

//create database
app.get("/createdb", (req, res) => {
  // let sql = "CREATE DATABASE nodemysql";
  db.query("CREATE DATABASE nodemysql", (err) => {
    if (err) {
      console.log("soem isue");
      throw err;
    }
    console.log(" db near create");
    res.send("database create");
  });
});

app.get("/createemp", (req, res) => {
  db.query(
    "create table employee(id int auto_increment, name varchar(255), designation varchar(255), primary key(id))",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Emp created");
      }
    }
  );
});

app.get("/insert", (req, res) => {
  let data = { name: "Akhil2", designation: "Earner" };
  let sql = "insert into employee set?";
  let query = db.query(sql, data, (err) => {
    if (err) {
      res.send("err");
    } else {
      res.send("created");
    }
  });
});

app.get("/select", (req, res) => {
  let script = "select * from employee";
  db.query(script, (err, result) => {
    if (err) {
      console.log("error");
    } else {
      console.log(result);
      res.send("select query ran");
    }
  });
});

app.get("/updateName/:id", (req, res) => {
  let newUser = "'Krishna'";
  let script = `update employee set name=${newUser} where id = ${req.params.id}`;
  db.query(script, (err, result) => {
    if (err) {
      console.log("Error osccured");
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get("/updateDes/:id", (req, res) => {
  let newDes = "'Power'";
  let script = `update employee set designation= ${newDes} where id=${req.params.id}`;
  console.log(script);
  db.query(script, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/delete/:id", (req, res) => {
  let script = "delete from employee where id=" + req.params.id;
  console.log(script);
  let query = db.query(script, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000);

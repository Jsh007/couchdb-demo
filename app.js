const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const NodeCouchDb = require("node-couchdb");

const couch = new NodeCouchDb({
  auth: {
    user: "admin",
    pass: "null",
  },
});

const dbName = "packsat-desk";
const view2Url = "_design/csview2/_view/cs-view2";
const view3Url = "_design/csview3/_view/cs-view3";
const viewAllUrl = "_all_docs";

// LIST DATABASES
couch.listDatabases().then((dbs) => {
  console.log(dbs);
});
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //   res.render("index");
  couch.get(dbName, view2Url).then(
    ({ data, headers, status }) => {
      //   console.log(data.rows);
      res.render("index", {
        users: data.rows,
      });
    },
    (err) => {
      console.log(err);
    }
  );
});

app.listen(3200, function () {
  console.log("Server started on port 3200");
});

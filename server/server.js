const express = require ("express");
const cors = require("cors");
const bodyparser = require ("body-parser");

const app =express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors({orgin: true, credentials: true }));

const stripe =require("stripe")("sk_test_51O8nIAGSTpg97mPkq2CF8WJwtE0HG5p7tbeGG0tQARnD8JFbqqb0UjTnoHb7eNurSjR683nPYizH7r9bhGgnaHPJ00DiBZOeZR");
  
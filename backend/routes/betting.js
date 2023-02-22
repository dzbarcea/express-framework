var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Data = require("./Data");

const dbRoute =
  "mongodb+srv://dbUser:3xC2YHmL3LPGKmGz@cluster0.tjr64gs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// get full database
router.get("/", function (req, res, next) {
  Data.find(function (err, data) {
    if (err) {
      return res.json({ success: false, error: err });
    } else {
      return res.json({ success: true, info: data });
    }
  });
});

//post handler
router.post("/", function (req, res, next) {
  let po = new Data();
  po.year = req.body.year;
  po.type = req.body.type;
  po.brand = req.body.brand;
  po.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/", function (req, res, next) {
  Data.findOneAndRemove(
    { year: req.body.year, type: req.body.type, brand: req.body.brand },
    (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
});

module.exports = router;

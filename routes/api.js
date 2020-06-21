const router = require("express").Router();
const Workout = require("../models/workout.js");
var path = require("path");
const mongoose = require("mongoose");

router.post("/api/workouts/", ({ body }, res) => {
  Workout.create(body)
    .then(dbTransaction => {
      console.log(dbTransaction);
      res.status(200).json({_id: dbTransaction._id});
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log("New Workout:", req.body);

  Workout
  .findByIdAndUpdate(
    req.params.id,
    {
      $push: {exercises: req.body}
    }
  )
    .then(dbTransaction => {
      res.status(200).json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbTransaction => {
      res.status(200).json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbTransaction => {
      res.status(200).json(dbTransaction);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;

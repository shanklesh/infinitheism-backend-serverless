const db = require("../models");
const Scheduler = db.scheduler;
const SchedulerTime = db.scheduler_time;
const SchedulerTracker = db.scheduler_tracker;

const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    const { body} = req;
    const data = JSON.parse(body);
    console.log(data)
    // Validate request
    if (!data.userId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a scheduler
    const scheduler = {
      scheduler_name: data.scheduler.schedulerName,
      scheduler_status: data.scheduler.schedulerStatus,
      user_id: data.userId
    };

    //Create scheduler time object

    const scheduler_time = {
        user_id: data.userId,
        scheduler_time: data.schedulerTime.schedulerTime,
        scheduler_day: data.schedularDay.schedularDay

    }

    //Create scheduler tracker object

    const  scheduler_tracker = {
        user_id: data.userId,
        scheduler_practice_status: data.schedulerTracker.practice
    }
  
    // Save Tutorial in the database
    Scheduler.create(scheduler)
      .then(data => {

        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const scheduler_name = req.query.scheduler_name;
    var condition = scheduler_name ? { scheduler_name: { [Op.iLike]: `%${scheduler_name}%` } } : null;
  
    Scheduler.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};
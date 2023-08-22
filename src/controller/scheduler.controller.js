const Sequelize = require("sequelize");

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
        scheduler_day: data.schedulerTime.schedulerDay

    }

    // Save Tutorial in the database
    Scheduler.create(scheduler)
      .then(response => {
        scheduler_time['scheduler_id'] =  response.scheduler_id;

        for(let i=0; i< data.schedulerTime.length; i++) {
             data.schedulerTime[i]['scheduler_id'] = response.scheduler_id;
        }

        SchedulerTime.bulkCreate(data.schedulerTime).then(timeResponse => {

                res.status(201).send(timeResponse);
        
            }
        ) .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Tutorial."
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const { userId } = req.params;
    try{
       
        const schedulerQuery = `select * from schedulers where user_id = '${userId}'`;
        
        const [schedulerResults, metadata] = await db.sequelize.query(schedulerQuery);

        const schedulerTimeQuery = `select * from scheduler_times where user_id = '${userId}' AND scheduler_id =${schedulerResults[0].scheduler_id};`;

        const [schedulerTimeResults, timeMetadata] = await db.sequelize.query(schedulerTimeQuery);

        const response = {};
              response['sceduler']= schedulerResults[0]
              response['scedulerTime']= schedulerTimeResults;

        res.send(response)

        // We didn't need to destructure the result here - the results were returned directly
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
  };
// Find a single Tutorial with an id
exports.updateTracker = (req, res) => {
    const { body} = req;
    const data = JSON.parse(body);
    console.log(data)
    // Validate request
    if (!data.schedulerId && ! data.schedulerTimeId && !data.userId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  

    //Create scheduler tracker object

    const  scheduler_tracker = {
        user_id: data.userId,
        status: data.status,
        scheduler_time_id : data.schedulerTimeId
    }
  
    // Save Tutorial in the database
    SchedulerTracker.create(scheduler_tracker)
      .then(response => {
         res.status(201).send('tracker updated');
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
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
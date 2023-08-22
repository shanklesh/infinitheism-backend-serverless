
module.exports = (sequelize, Sequelize) => {
    const SchedulerTime = sequelize.define("scheduler_time", {
      scheduler_time_id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
      },
      scheduler_id: {
        type: Sequelize.INTEGER
      },
      scheduler_time: {
        type: Sequelize.STRING
      },
      scheduler_day: {
        type: Sequelize.STRING
      },
    });
    
    return SchedulerTime;
  };
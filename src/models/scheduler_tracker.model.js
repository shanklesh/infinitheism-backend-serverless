module.exports = (sequelize, Sequelize) => {
    const SchedulerTracker = sequelize.define("scheduler_tracker", {
      scheduler_tracker_id: {
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
      },
      scheduler_time_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      scheduler_practice_status: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return SchedulerTracker;
  };
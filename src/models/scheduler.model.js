

module.exports = (sequelize, Sequelize) => {
    const Scheduler = sequelize.define("scheduler", {
      scheduler_id: {
       type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
      },
      scheduler_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      scheduler_status: {
        type: Sequelize.STRING
      }
    });
     
    return Scheduler;
  };
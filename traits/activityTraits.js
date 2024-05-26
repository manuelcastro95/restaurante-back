const Log = require('../models/Log');

const logCreate = async (userId, details) => {
  await Activitylog(userId, 'create', details);
};

const logUpdate = async (userId, details) => {
  await Activitylog(userId, 'update', details);
};

const logDelete = async (userId, details) => {
  await Activitylog(userId, 'delete', details);
};

const logOther = async (userId,action, details) => {
  await Activitylog(userId, action, details);
};

const Activitylog = async (userId, action, details) => {
  try {
    const log = new Log({
      userId,
      action,
      details
    });
    await log.save();
    console.log(`Acción ${action} de usuario registrada con éxito.`);
  } catch (error) {
    console.error(`Error al registrar la acción ${action} del usuario:`, error);
  }
};

module.exports = {
  logCreate,
  logUpdate,
  logDelete,
  logOther
};


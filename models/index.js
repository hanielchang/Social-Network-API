// When we add new models, MongoDB doesn't require us to restart
// and recreate the database. SQL does, however.

const User = require('./User');
const Comment = require('./Thought');

module.exports = { User, Comment };
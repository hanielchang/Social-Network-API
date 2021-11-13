const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Username is Required'
  },

  email: {
    type: String,
    unique: true,
    required: 'Email is Required',
    match: [/.+@.+\..+/]
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const User = model('User', UserSchema);

module.exports = User;

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


// Virtuals allow you to add virtual properties to a document that aren't stored in the database. 
// They're normally computed values that get evaluated when you try to access their properties.
// Virtuals allow us to add more information to a database response so that we don't have 
// to add in the information manually with a helper before responding to the API request.

// ----------------line 43----------------
// In its basic form, .reduce() takes two parameters, an accumulator and a currentValue. 
// Here, the accumulator is total, and the currentValue is comment. As .reduce() walks through 
// the array, it passes the accumulating total and the current value of comment into the function, 
// with the return of the function revising the total for the next iteration through the array.
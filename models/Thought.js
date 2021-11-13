const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: 'Reaction text is required'
    },

    username: {
        type: String,
        required: 'Username is Required',
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        minlength: 1,
        required: 'Text is Required'
    },

    username: {
        type: String,
        required: 'Username is Required',
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },

    reactions: [ReactionSchema]
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

// get total count of replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

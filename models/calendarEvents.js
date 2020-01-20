const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarEventsSchema = new Schema({

    eventDate: {
        type: String
    },

    eventLocation: {
        type: String
    },

    eventTime: {
        type: String
    },

    eventDescription: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now,
        index: {
            unique: true
        }
    }

});

const CalendarEvents = mongoose.model("CalendarEvents", calendarEventsSchema);

module.exports = CalendarEvents;

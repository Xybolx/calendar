import axios from "axios";

export default {
    // gets all high scores
    getCalendarEvents: function () {
        return axios.get("/api/calendarEvents");
    },
    // Saves a score to the database
    saveCalendarEvent: function (calendarEventData) {
        return axios.post("/api/calendarEvents", calendarEventData);
    }
}
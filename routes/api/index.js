const router = require("express").Router();
const calendarEventsRoutes = require("./calendarEvents");

// scores routes
router.use("/calendarEvents", calendarEventsRoutes);

module.exports = router;
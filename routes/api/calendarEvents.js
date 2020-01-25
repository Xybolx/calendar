const router = require("express").Router();
const calendarEventsController = require("../../controllers/calendarEventsController");

// Matches with "/api/calendarEvents"
router
    .route("/")
    .get(calendarEventsController.findAll)
    .post(calendarEventsController.create)
    .delete(calendarEventsController.remove);

// Matches with "/api/rants/:id"
router
    .route("/:id")
    .get(calendarEventsController.findById)
    .put(calendarEventsController.update)
    .delete(calendarEventsController.removeOne);

module.exports = router;
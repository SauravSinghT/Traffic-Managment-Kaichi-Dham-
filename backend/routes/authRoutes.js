const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {getroute} = require("../controllers/routeController");
const { setEvent, getAllEvents, deleteEventsByDate } = require('../controllers/eventController');

router.post('/register', register);
router.post('/login', login);
router.post('/getroute',getroute);
router.post('/setevents',setEvent);
router.get("/getallevents",getAllEvents);
router.post("/deleteevents",deleteEventsByDate);

module.exports = router;

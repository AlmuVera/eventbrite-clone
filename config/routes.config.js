const express = require('express');
const router = express.Router();

const events = require('../controllers/events.controller.js')

router.get('/', events.list); //render event list with filters
router.get("/new", events.new); //render event form
router.get('/:id', events.detail) //render event detail
router.post('/', events.create); //create event and redirect to list
router.post('/:id/delete', events.delete) //render event detail


module.exports = router;

//update del CRUD Carlos dijo que de momento no

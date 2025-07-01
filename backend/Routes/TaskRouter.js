const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');
const ensureAuthenticated = require('../Middlewears/Auth');

const router = require('express').Router();

router.get('/',ensureAuthenticated, fetchAllTasks);

router.post('/', ensureAuthenticated ,createTask);

router.put('/:id', ensureAuthenticated,  updateTaskById);

router.delete('/:id', ensureAuthenticated , deleteTaskById);

module.exports = router;
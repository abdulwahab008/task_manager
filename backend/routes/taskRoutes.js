const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const authMiddleware = require('../middleware/auth');

// Protect all routes
router.use(authMiddleware);

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id/priority', taskController.updatePriority);
router.put('/tasks/:id/due-date', taskController.updateDueDate);

module.exports = router;

// routes/taskRoutes.mjs
import express from 'express';
const router = express.Router();

import { createTask, getTasks, updateTask, deleteTask } from '../controller/taskController.mjs';

// Routes
router.post('/', createTask);    // Add a new task
router.get('/', getTasks);       // Get all tasks
router.patch('/:id', updateTask); // Update a task
router.delete('/:id', deleteTask); // Delete a task

export default router;

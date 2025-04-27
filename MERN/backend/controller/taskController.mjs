// controller/taskController.mjs
import Task from "../models/Task Manager/taskmodle.mjs";  // Import the updated Task model

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;

  // Validate required fields
  if (!title || !assignedTo) {
    return res.status(400).json({ message: 'Title and assignedTo are required' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      status,
    });
    await newTask.save();
    res.status(201).json(newTask);  // Send back the created task
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);  // Send back the tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status } = req.body;

  // Validate required fields
  if (!title || !assignedTo) {
    return res.status(400).json({ message: 'Title and assignedTo are required' });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, { title, description, assignedTo, status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);  // Send back the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};





// --------------------------------------SATATUS------------------------------


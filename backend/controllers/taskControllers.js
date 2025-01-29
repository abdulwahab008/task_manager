const db = require('../config/database');

const getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const [result] = await db.query(
      'INSERT INTO tasks (title, user_id) VALUES (?, ?)',
      [title, req.userId]
    );
    
    const [newTask] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json(newTask[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    // Verify task belongs to user
    const [task] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.query(
      'UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
      [title, completed, id, req.userId]
    );

    const [updatedTask] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );
    
    res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify task belongs to user
    const [task] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

const updatePriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    
    // Verify task belongs to user
    const [task] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.query(
      'UPDATE tasks SET priority = ? WHERE id = ? AND user_id = ?',
      [priority, id, req.userId]
    );

    const [updatedTask] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );
    
    res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating task priority:', error);
    res.status(500).json({ error: 'Failed to update task priority' });
  }
};

const updateDueDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { dueDate } = req.body;
    
    // Verify task belongs to user
    const [task] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.query(
      'UPDATE tasks SET due_date = ? WHERE id = ? AND user_id = ?',
      [dueDate, id, req.userId]
    );

    const [updatedTask] = await db.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );
    
    res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating task due date:', error);
    res.status(500).json({ error: 'Failed to update task due date' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updatePriority,
  updateDueDate
};

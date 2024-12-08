import Task from '../models/taskModel.js';

export const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        const userId = req.user._id;

        const taskObj = {
            description,
            createdBy: userId,
        };

        const task = await Task.create(taskObj);

        return res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: ' Failed to create task' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findOneAndUpdate(
            {
                _id: taskId,
                createdBy: userId,
            },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ message: ' Failed to update task' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findByIdAndDelete({
            _id: taskId,
            createdBy: userId,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: ' Failed to delete task' });
    }
};

export const getTasksByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({
            createdBy: userId,
        });

        return res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ message: ' Failed to find tasks' });
    }
};

export const getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        const task = await Task.findOne({
            _id: taskId,
            createdBy: userId,
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (err) {
        res.status(400).json({ message: ' Failed to found task' });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find();

        return res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ message: ' Failed to find all tasks' });
    }
};
const TaskModel = require("../Modals/TaskModel");


const createTask = async (req, res) => {
    try {
        const { taskName, isDone } = req.body; 

        const model = new TaskModel({
            taskName,
            isDone,
            userId: req.user._id
        });

        await model.save();

        res.status(201).json({ message: 'Task is created', success: true });
    } catch (err) {
        console.error('Create task error:', err);
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};


const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({ userId: req.user._id });
        res.status(200)
            .json({ message: 'All Tasks are fetched', success: true, data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get all tasks', success: false });
    }
}

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;       
        const body = req.body;          
        const userId = req.user._id;    

        const task = await TaskModel.findById(id);

        if (!task || task.userId.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not allowed to update this task',
                success: false
            });
        }
        await TaskModel.findByIdAndUpdate(id, { $set: body });

        res.status(200).json({ message: 'Task Updated', success: true });

    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;         
        const userId = req.user._id;      
     
        const task = await TaskModel.findById(id);

        if (!task || task.userId.toString() !== userId) {
            return res.status(403).json({
                message: 'You are not allowed to delete this task',
                success: false
            });
        }

        await TaskModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Task is deleted', success: true });

    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
}


module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}
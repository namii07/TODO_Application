const Todo = require('../models/Todo');

// @desc    Get todos
// @route   GET /todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Set todo
// @route   POST /todos
const setTodo = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ message: 'Please add a title field' });
        }
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description || '',
            user: req.user._id
        });
        return res.status(201).json(todo);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update todo (toggle complete)
// @route   PATCH /todos/:id
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedTodo);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete todo
// @route   DELETE /todos/:id
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        await todo.deleteOne();
        return res.status(200).json({ id: req.params.id });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getTodos, setTodo, updateTodo, deleteTodo };

import dbConnect from '@/lib/mongoose';
import Todo from '@/models/Todo';

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;
    const { tid } = req.query;
    switch (method) {
        case 'GET':
            const todos = await Todo.find({});
            return res.status(200).json(todos);
        case 'POST':
            const newTodo = new Todo({
                text: req.body.text,
            });
            try {
                const savedTodo = await newTodo.save();
                return res.status(200).json(savedTodo, {status: 201});
            } catch (error) {
                return res.status(200).json({success: false});
            }
        case 'DELETE':
            try {
                const deletedTodo = await Todo.findByIdAndDelete(tid);
                return res.status(200).json(deletedTodo, {status: 204});
            } catch (error) {
                return res.status(200).json({success: false});
            }
        case 'PUT':
            try {
                const updatedTodo = await Todo.findByIdAndUpdate(tid, {completed: true});
                return res.status(200).json(updatedTodo, {status: 204});
            } catch (error) {
                return res.status(200).json({success: false});
            }
        default:
            return res.status(200).json({success: false});
    }
}

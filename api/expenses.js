import mongoose from 'mongoose';
import Expense from '../../db/Model';

const connectDB = async () => {
    try{if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.mongodbUrl);}
  catch(error){
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
 
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const expenses = await Expense.find();
    return res.status(200).json(expenses);
  }

  if (req.method === 'POST') {
    const { description, amount } = req.body;
    const expense = await Expense.create({ description, amount });
    return res.status(201).json(expense);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

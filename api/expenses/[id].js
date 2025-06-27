import mongoose from 'mongoose';
import Expense from '../../../db/model'


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

  const { id } = req.query;

  if (req.method === 'DELETE') {
    await Expense.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Deleted' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

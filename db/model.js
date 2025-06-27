import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  description: String,
  amount: Number
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

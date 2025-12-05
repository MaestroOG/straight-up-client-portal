import { Schema, models, model } from 'mongoose';

const expenditureSchema = new Schema({
    expenditure: {
        type: Number,
        required: true,
    },
    forUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Expenditure = models.Expenditure || model('Expenditure', expenditureSchema);
export default Expenditure;
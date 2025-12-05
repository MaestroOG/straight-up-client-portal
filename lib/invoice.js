import Invoice from "@/models/Invoice";
import { connectDB } from "./mongodb";

export async function getAllInvoices() {
    await connectDB();
    return await Invoice.find({}).populate("partner").sort({ createdAt: -1 }).lean();
}

export async function getInvoiceDetails(id) {
    await connectDB();
    return await Invoice.findById(id).populate("partner").lean();
}
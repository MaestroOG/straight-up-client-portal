import { getAllComments } from "@/lib/admin";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const data = await getAllComments(page, limit);
    return Response.json(data);
}

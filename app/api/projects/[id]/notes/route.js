import { getNotesByProjectId } from "@/lib/projects";

export async function GET(req, { params }) {

    const id = await params.id;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const data = await getNotesByProjectId(id, page, limit);
    return Response.json(data);
}

import { getMetadata } from "@/utils/oauth/getMetadata";

export async function GET() {
  const metadata = getMetadata();
  return Response.json(metadata);
}

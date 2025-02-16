import { getMetadata } from "@logplace/atproto";

export async function GET() {
  const metadata = getMetadata();
  return Response.json(metadata);
}

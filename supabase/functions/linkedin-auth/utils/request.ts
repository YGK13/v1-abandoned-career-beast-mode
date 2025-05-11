
/**
 * Parse and validate the request body
 */
export async function parseRequestBody(req) {
  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body));
    return body;
  } catch (e) {
    console.error("Error parsing request body:", e);
    throw new Error("Invalid request body");
  }
}

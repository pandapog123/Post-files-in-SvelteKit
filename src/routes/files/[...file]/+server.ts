import { error } from "@sveltejs/kit";

import fs from "fs";
import path from "path";

export async function GET({ params }) {
  let dirname = process.cwd();

  try {
    return new Response(fs.readFileSync(path.join(dirname, params.file)));
  } catch (err) {
    if (err instanceof Error) {
      throw error(400, err.message);
    }

    throw error(400, "Unknown error occured while uploading file");
  }
}

import { fail, redirect } from "@sveltejs/kit";
import fs from "fs";
import path from "path";

export const actions = {
  uploadFile: async ({ request }) => {
    const formData = await request.formData();

    let fileName: string | undefined;

    try {
      const file = formData.get("file");

      // Verify image is valid
      if (!(file instanceof File)) {
        throw new Error(`file must be a file`);
      }

      if (file.size === 0) {
        throw new Error(`file cannot be empty`);
      }

      const dirname = process.cwd();

      fileName = path.join("files", file.name);

      const uploadData = await file.arrayBuffer();

      fs.writeFileSync(
        path.join(dirname, "files", file.name),
        new Uint8Array(uploadData)
      );
    } catch (error) {
      if (error instanceof Error) {
        return fail(400, { message: error.message });
      }

      return fail(400, {
        message: "Unknown error occured while uploading file",
      });
    }

    if (!fileName) {
      return fail(400, {
        message: "Unknown error occured while uploading file",
      });
    }

    throw redirect(303, path.join("files", fileName));
  },
};

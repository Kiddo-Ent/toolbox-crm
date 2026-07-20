  import { randomUUID } from "crypto";

  import { supabaseAdmin } from "@/lib/supabase/admin";

  interface UploadPhotoOptions {
    opportunityId: string;
    file: File;
  }

  export async function uploadOpportunityPhoto({
    opportunityId,
    file,
  }: UploadPhotoOptions) {
    const extension =
      file.name.split(".").pop() ?? "jpg";

    const fileName =
      `${randomUUID()}.${extension}`;

    const storagePath =
      `opportunities/${opportunityId}/${fileName}`;

    const buffer =
      Buffer.from(await file.arrayBuffer());

    const { error: uploadError } =
      await supabaseAdmin.storage
        .from("toolbox-photos")
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

    if (uploadError) {
      throw uploadError;
    }

    const { error: dbError } =
      await supabaseAdmin
        .from("photos")
        .insert({
          opportunity_id: opportunityId,

          file_name: file.name,

          storage_path: storagePath,

          content_type: file.type,

          file_size: file.size,
        });

    if (dbError) {
      throw dbError;
    }

    return storagePath;
  }
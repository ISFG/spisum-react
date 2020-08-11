import contentDisposition from "content-disposition";
import { ApiURL } from "core/apiURL";
import { File } from "core/entities/file/File";
import { getService } from "core/features/dependencyInjection";
import { HttpClient } from "core/services/HttpClient";
import fileDownload from "js-file-download";
import mime from "mime-types";
import { ShreddingPlan } from "../../features/login/_types";

export const fetchShreddingPlanComponent = async (
  shreddingPlan: ShreddingPlan,
  download?: boolean
): Promise<File | null> => {
  const httpClient = getService<HttpClient>(HttpClient);

  const shreddingPlanId = shreddingPlan?.id;

  try {
    const { response, success, responseHeaders } = await httpClient.fetch(
      ApiURL.CODE_LISTS_SHREDDING_PLAN_PRINT,
      "GET",
      {
        contentType: "application/octet-stream",
        params: {
          shreddingPlanId
        }
      }
    );

    if (success) {
      const disposition = contentDisposition.parse(
        responseHeaders?.get("content-disposition") || ""
      );
      const contentType = responseHeaders?.get("content-type") || "";
      const extension = mime.extension(contentType);

      if (download) {
        fileDownload(response as Blob, `_${shreddingPlan.name}.${extension}`);
      }

      return {
        content: response as File["content"],
        id: shreddingPlanId,
        name: `${disposition.parameters.filename}.${extension}`
      };
    }

    return null;
  } catch (e) {
    return null;
  }
};

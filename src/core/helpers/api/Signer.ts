import { ApiURL } from "core/apiURL";
import { File } from "core/entities";
import { getService } from "core/features/dependencyInjection";
import { HttpClient } from "core/services/HttpClient";

export interface SignerResponseComponent {
  id: string;
  component: string;
  status: string;
}

export interface SignerCreateResponse {
  batchId?: string;
  signer: string;
  components: string[];
}

const transformParams = (files: string[]): string => {
  return files?.reduce((acc, currVal) => {
    return `${acc}&componentId=${currVal}`;
  }, "");
};

export const signer = {
  async getSignerData(
    documentId: string,
    files: File[],
    visual: boolean
  ): Promise<SignerCreateResponse | null> {
    const httpClient = getService<HttpClient>(HttpClient);
    const params = transformParams(files.map((file) => file.id));
    try {
      const response = await httpClient.fetch(
        `${
        ApiURL.SIGNER_CREATE
        }?documentId=${documentId}${params}&visual=${String(visual)}`,
        "GET"
      );

      return response.success
        ? (response.response as SignerCreateResponse)
        : null;
    } catch (e) {
      return null;
    }
  },

  async getComponentsSignStatus(
    componentId: string
  ): Promise<SignerResponseComponent[]> {
    const httpClient = getService<HttpClient>(HttpClient);

    try {
      const response = await httpClient.fetch(ApiURL.SIGNER_GET_STATUS, "GET", {
        params: {
          componentId
        }
      });
      if (!response.success) {
        return [];
      }

      return response.response as SignerResponseComponent[];
    } catch (e) {
      return [];
    }
  }
};

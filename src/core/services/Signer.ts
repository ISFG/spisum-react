import { Inject, Injectable } from "injection-js";
import { ApiURL } from "../apiURL";
import { File } from "../entities";
import { HttpClient } from "../features/httpClient/services/HttpClient";

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

@Injectable()
export class Signer {
  static get parameters() {
    return [new Inject(HttpClient)];
  }

  constructor(protected httpClient: HttpClient) {}

  private transformParams(files: string[]): string {
    return files?.reduce((acc, currVal) => {
      return `${acc}&componentId=${currVal}`;
    }, "");
  }

  public async getSignerData(
    documentId: string,
    files: File[]
  ): Promise<SignerCreateResponse | null> {
    const params = this.transformParams(files.map((file) => file.id));
    try {
      const response = await this.httpClient.fetch(
        `${ApiURL.SIGNER_CREATE}?documentId=${documentId}${params}`,
        "GET"
      );
      const data = await response.json();
      return response.ok ? data : null;
    } catch (e) {
      return null;
    }
  }

  public async getComponentsSignStatus(
    componentData: string | undefined
  ): Promise<SignerResponseComponent[]> {
    try {
      if (!componentData) return [];
      const response = await this.httpClient.fetch(
        `${ApiURL.SIGNER_GET_STATUS}?componentId=${componentData}`,
        "GET"
      );
      const json = await response.json();
      if (!response.ok) {
        return [];
      }
      return json;
    } catch (e) {
      return [];
    }
  }
}

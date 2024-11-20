import fetch from "cross-fetch";
import { v4 } from "uuid";
import { objectToUrlParams } from "./utils";

type ResponseData<ReturnType> = {
  code: number;
  message?: string;
  data: ReturnType;
};
type RequestData = { headers: HeadersInit; body: BodyInit };

interface BaseParams {
  [key: string]: unknown; // Allows any other properties
}
interface PutBaseParams {
  id: string;
  [key: string]: unknown; // Allows any other properties
}

/**
 * Methods for sending requests to the Circle REST API
 */
export class BaseApi {
  private baseUrl: string;
  private apiKey: string;
  protected cipherText?: string;

  /**
   * Constructs a new `BaseApi` instance
   * @param baseUrl the base URL for the Circle REST API
   * @param apiKey the API key to include with requests
   */
  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  /**
   * Get a set of headers (including the API key) that will be used by this `BaseApi`
   */
  get headers(): HeadersInit {
    return {
      "Content-Type": "application/json",
      "X-Request-Id": v4(),
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  private prepareRequestData<Params extends Record<string, unknown>>(
    params: Params,
  ): RequestData {
    return {
      headers: this.headers,
      body: JSON.stringify({
        ...params,
      }),
    } as RequestData;
  }

  private async prepareResponseData<ReturnType>(
    res: Response,
    fieldName?: string,
  ): Promise<ReturnType> {
    const response = (await res.json()) as unknown as ResponseData<ReturnType>;
    if (Number(response.code)) {
      throw new Error(`ERROR CODE: ${response.code}. ${response.message}`);
    }
    if (fieldName) {
      return (response.data as unknown as Record<string, ReturnType>)[
        fieldName
      ];
    }
    return response.data;
  }

  /**
   * Send a POST request to the Circle REST API and return the response
   * @param endPoint the API endpoint for the POST request
   * @param params the parameters for the POST request
   * @param fieldName the response field to return (all fields will be returned if omitted)
   * @returns the requested POST response field or the entire response if the `fieldName` parameter was omitted
   */
  async postRequest<ReturnType>(
    endPoint: string,
    params: BaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const response = await fetch(`${this.baseUrl}${endPoint}`, {
      ...this.prepareRequestData<BaseParams>(params),
      method: "post",
    });

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }

  /**
   * Send a PUT request to the Circle REST API and return the response
   * @param endPoint the API endpoint for the PUT request
   * @param params the parameters for the PUT request
   * @param fieldName the response field to return (all fields will be returned if omitted)
   * @returns the requested PUT response field or the entire response if the `fieldName` parameter was omitted
   */
  async putRequest<ReturnType>(
    endPoint: string,
    params: PutBaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const { id, ...rest } = params;

    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData<BaseParams>(rest),
      method: "put",
    });

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }

  /**
   * Send a PATCH request to the Circle REST API and return the response
   * @param endPoint the API endpoint for the PATCH request
   * @param params the parameters for the PATCH request
   * @param fieldName the response field to return (all fields will be returned if omitted)
   * @returns the requested PATCH response field or the entire response if the `fieldName` parameter was omitted
   */
  async patchRequest<ReturnType>(
    endPoint: string,
    params: PutBaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const { id, ...rest } = params;
    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData<BaseParams>(rest),
      method: "patch",
    });

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }

  /**
   * Send a DELETE request to the Circle REST API and return the response
   * @param endPoint the API endpoint for the DELETE request
   * @param params the parameters for the DELETE request
   * @param fieldName the response field to return (all fields will be returned if omitted)
   * @returns the requested DELETE response field or the entire response if the `fieldName` parameter was omitted
   */
  async deleteRequest<ReturnType>(
    endPoint: string,
    params: PutBaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const { id, ...rest } = params;
    const response = await fetch(`${this.baseUrl}${endPoint}/${id}`, {
      ...this.prepareRequestData<BaseParams>(rest),
      method: "delete",
    });

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }

  /**
   * Send a GET request to the Circle REST API and return the response
   * @param endPoint the API endpoint for the GET request
   * @param params (optional) the parameters for the GET request
   * @param fieldName the response field to return (all fields will be returned if omitted)
   * @returns the requested GET response field or the entire response if the `fieldName` parameter was omitted
   */
  async getRequest<ReturnType>(
    endPoint: string,
    params?: BaseParams,
    fieldName?: string,
  ): Promise<ReturnType> {
    const urlParams = objectToUrlParams(params);

    const response = await fetch(
      `${this.baseUrl}${endPoint}${urlParams ? `?${urlParams}` : ""}`,
      {
        method: "get",
        headers: this.headers,
      },
    );

    return this.prepareResponseData<ReturnType>(response, fieldName);
  }
}
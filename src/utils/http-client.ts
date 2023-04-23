import axios from "axios";
import { IHttpRequest, IHttpResponse } from "../types/common.types";

export class HttpClient {
  private handleHttpError(err: Record<string, any>): IHttpResponse {
    let response = null;
    if (err.response) {
      if (err.response.data) {
        response = {
          data: err.response.data,
          status: err.response.status,
        };
      }
    } else if (err.request) {
      response = err.request;
    }

    return response;
  }

  private defaultHttpHeaders() {
    return {
        'content-type': 'application/json',
        'accept': 'application/json'
    }
  }

  public async send(request: IHttpRequest): Promise<IHttpResponse> {
    const { hosturl, headers, payload, endpoint, method } = request;

    const client = axios.create({
      baseURL: hosturl,
      headers: {
        ...this.defaultHttpHeaders(),
        ...headers
      }
    });

    let response: IHttpResponse;

    try {
      switch (method) {
        case "post":
          try {
            response = await client.post(endpoint, payload);
            response = {
              data: response.data,
              status: response.status,
            };
          } catch (err) {
            response = this.handleHttpError(err);
          }
          break;
        case "get":
          try {
            response = await client.get(endpoint);
            response = {
              data: response.data,
              status: response.status,
            };
          } catch (err) {
            response = this.handleHttpError(err);
          }

          break;
        case "put":
          try {
            response = await client.put(endpoint);
            response = {
              data: response.data,
              status: response.status,
            };
          } catch (err) {
            response = this.handleHttpError(err);
          }
          break;
        case "delete":
          try {
            response = await client.delete(endpoint);
            response = {
              data: response.data,
              status: response.status,
            };
          } catch (err) {
            response = this.handleHttpError(err);
          }

          break;
        default:
          throw "Http method not handled";
      }

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export const httpClient = new HttpClient();

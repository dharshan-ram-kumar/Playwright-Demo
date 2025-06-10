import {
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";

export class APIClient {
  private context: APIRequestContext;

  private constructor(context: APIRequestContext) {
    this.context = context;
  }

  static async create(headers?: Record<string, string>): Promise<APIClient> {
    const context = await playwrightRequest.newContext({
      extraHTTPHeaders: headers,
    });
    return new APIClient(context);
  }

  async get(url: string, options = {}) {
    return this.context.get(url, options);
  }

  async post(url: string, options = {}) {
    return this.context.post(url, options);
  }

  async put(url: string, options = {}) {
    return this.context.put(url, options);
  }

  async delete(url: string, options = {}) {
    return this.context.delete(url, options);
  }
  async dispose() {
    await this.context.dispose();
  }
}

import { BaseApi } from './BaseApi';
import type { Token } from './types';

export class TokenLookupApi extends BaseApi {
  /**
   * Fetches details of a specific token given its unique identifier.
   * Every token in your network of wallets has a UUID associated with it,
   * regardless of whether it's already recognized or was added as a monitored token.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-token-id
   * @param id The universally unique identifier of the resource.
   * @returns the requested token
   */
  async get(id: string): Promise<Token> {
    return this.getRequest<Token>(`/w3s/tokens/${id}`, undefined, 'token');
  }
}

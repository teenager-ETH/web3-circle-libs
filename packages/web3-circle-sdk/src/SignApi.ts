import { DeveloperApi } from './DeveloperApi';
import type {
  SignMessageParameters,
  SignTypedDataParameters,
  SignTransactionParameters,
  SignDelegateActionParameters,
  SignedTransaction,
  SignedTransactionDelegate,
} from './types';

export class SignApi extends DeveloperApi {
  /**
   * Sign the EIP-191 message from a specified developer-controlled wallet.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-message
   * @param params the parameters for the sign message request
   * @returns the signed message
   */
  async signMessage(params: SignMessageParameters): Promise<string> {
    return this.postRequest<string>(
      '/w3s/developer/sign/message',
      await this.addCipherTextToParams<SignMessageParameters>(params),
      'signature',
    );
  }
  /**
   * Sign the EIP-712 typed structured data from a specified developer-controlled wallet.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-typed-data
   * @param params the parameters for the sign typed data request
   * @returns the signed typed data
   */
  async signTypedData(params: SignTypedDataParameters): Promise<string> {
    return this.postRequest<string>(
      '/w3s/developer/sign/typedData',
      await this.addCipherTextToParams<SignTypedDataParameters>(params),
      'signature',
    );
  }

  /**
   * Sign a transaction from a specific developer-controlled wallet.
   * This endpoint is only available for the following chains:
   * SOL, SOL-DEVNET, NEAR, NEAR-TESTNET, EVM, TEST-TESTNET
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-transaction
   * @param params the parameters for the sign transaction request
   * @returns the signed transaction
   */
  async signTransaction(params: SignTransactionParameters): Promise<SignedTransaction> {
    return this.postRequest<SignedTransaction>(
      '/w3s/developer/sign/transaction',
      await this.addCipherTextToParams<SignTransactionParameters>(params),
    );
  }

  /**
   * Sign a delegate action from a specific developer-controlled wallet.
   * This endpoint is only available for NEAR and NEAR-TESTNET
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-delegate-action
   * @param params the parameters for the sign delegate action request
   * @returns the signed delegate action
   */
  async signDelegateAction(
    params: SignDelegateActionParameters,
  ): Promise<SignedTransactionDelegate> {
    return this.postRequest<SignedTransactionDelegate>(
      '/w3s/developer/sign/delegateAction',
      await this.addCipherTextToParams<SignDelegateActionParameters>(params),
    );
  }
}

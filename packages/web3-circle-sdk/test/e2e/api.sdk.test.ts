import { v4 } from 'uuid';

import { CircleSdk, BLOCKCHAIN } from '../../src';

const apikey = process.env.API_KEY as string;
const secret = process.env.SECRET as string;

describe('Api SDK Tests', () => {
  const sdk = new CircleSdk(apikey, secret);
  beforeAll(async () => {
    await sdk.init();
  });

  it('List wallets', async () => {
    const res = await sdk.wallet.list();
    expect(res).toBeDefined();
    const wallet = res[0];
    expect(wallet.id).toBeDefined();
    expect(wallet.state).toBe('LIVE');
    expect(wallet.walletSetId).toBe('8ab26468-aa26-5158-b582-9d0f42e4d40f');
    expect(wallet.custodyType).toBe('DEVELOPER');
    expect(wallet.address).toBeDefined();
    expect(wallet.accountType).toBe('EOA');
    expect(wallet.updateDate).toBeDefined();
    expect(wallet.createDate).toBeDefined();
  });
  it('Retrieve a wallet', async () => {
    const id = 'd9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7';
    const wallet = await sdk.wallet.get(id);
    expect(wallet.id).toBe(id);
    expect(wallet.state).toBe('LIVE');
    expect(wallet.walletSetId).toBe('8ab26468-aa26-5158-b582-9d0f42e4d40f');
    expect(wallet.custodyType).toBe('DEVELOPER');
    expect(wallet.address).toBeDefined();
    expect(wallet.accountType).toBe('EOA');
    expect(wallet.updateDate).toBeDefined();
    expect(wallet.createDate).toBeDefined();
  });
  it('Create wallets', async () => {
    const res = await sdk.wallet.create({
      walletSetId: '8ab26468-aa26-5158-b582-9d0f42e4d40f',
      idempotencyKey: v4(),
      blockchains: [BLOCKCHAIN.ETH_SEPOLIA],
    });
    expect(res).toBeDefined();
    const wallet = res[0];
    expect(wallet.id).toBeDefined();
    expect(wallet.state).toBe('LIVE');
    expect(wallet.walletSetId).toBe('8ab26468-aa26-5158-b582-9d0f42e4d40f');
    expect(wallet.custodyType).toBe('DEVELOPER');
    expect(wallet.address).toBeDefined();
    expect(wallet.blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
    expect(wallet.accountType).toBe('EOA');
    expect(wallet.updateDate).toBeDefined();
    expect(wallet.createDate).toBeDefined();
  });

  it('Update a wallet', async () => {
    const id = 'd9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7';
    const randName = `name-${v4()}`;
    const randRefId = `refId-${v4()}`;
    const wallet = await sdk.wallet.update({
      id,
      name: randName,
      refId: randRefId,
    });
    expect(wallet.id).toBe(id);
    expect(wallet.name).toBe(randName);
    expect(wallet.refId).toBe(randRefId);
  });

  it('Get token balance for a wallet', async () => {
    const id = 'd9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7';
    const balances = await sdk.wallet.balance({
      id,
    });
    expect(balances).toBeDefined();
  });
  it('Get NFTs for a wallet', async () => {
    const id = 'd9d5d92e-c75f-5bd9-bcfc-fa26273ba8f7';
    const nfts = await sdk.wallet.nfts({
      id,
    });
    expect(nfts).toBeDefined();
  });
});
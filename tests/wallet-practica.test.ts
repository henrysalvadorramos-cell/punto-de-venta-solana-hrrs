import '../src/polyfills';
import test from 'node:test';
import assert from 'node:assert/strict';
import { PublicKey, Transaction, TransactionInstruction, type Connection } from '@solana/web3.js';
import { WalletPractica } from '../src/solana/wallet-practica';
import { REGISTRO_PROGRAM_ADDRESS } from '../clients/js/src/generated';

test('la cuenta temporal se crea en memoria y cambia después de desconectarse', async () => {
  const wallet = new WalletPractica();
  assert.equal(wallet.publicKey, null);
  await wallet.connect();
  const primera = wallet.publicKey!.toBase58();
  await wallet.disconnect();
  assert.equal(wallet.publicKey, null);
  await wallet.connect();
  assert.notEqual(wallet.publicKey!.toBase58(), primera);
});

test('la cuenta temporal rechaza otro programa y cualquier red distinta de Devnet', async () => {
  const wallet = new WalletPractica();
  await wallet.connect();
  const tx = (programId: PublicKey) => new Transaction({ feePayer: wallet.publicKey! })
    .add(new TransactionInstruction({ programId, keys: [] }));
  const rpc = { getGenesisHash: async () => 'otra-red' } as Connection;
  await assert.rejects(wallet.sendTransaction(tx(PublicKey.default), rpc), /solo firma instrucciones/);
  await assert.rejects(wallet.sendTransaction(tx(new PublicKey(REGISTRO_PROGRAM_ADDRESS)), rpc), /solo permite escribir en Devnet/);
});

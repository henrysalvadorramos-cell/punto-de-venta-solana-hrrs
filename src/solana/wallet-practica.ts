import { BaseWalletAdapter, WalletReadyState, type WalletName, type SendTransactionOptions } from '@solana/wallet-adapter-base';
import { Keypair, type Connection, type Transaction } from '@solana/web3.js';
import { REGISTRO_PROGRAM_ADDRESS } from '../../clients/js/src/generated';
import { comprobarPrograma } from './seguridad';

/** Firmante efímero para la demostración local, sin extensiones ni claves importadas. */
export class WalletPractica extends BaseWalletAdapter {
  name = 'Práctica Devnet (temporal)' as WalletName;
  url = 'https://solana.com/developers';
  icon = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" rx="9" fill="%233c3151"/%3E%3Cpath d="M10 13h20v14H10z M23 20h7" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/%3E%3C/svg%3E';
  readyState = WalletReadyState.Installed;
  supportedTransactionVersions = null;
  connecting = false;
  private cuenta: Keypair | null = null;

  get publicKey() { return this.cuenta?.publicKey ?? null; }

  async connect() {
    if (this.cuenta) return;
    this.cuenta = Keypair.generate();
    this.emit('connect', this.cuenta.publicKey);
  }

  async disconnect() {
    this.cuenta = null;
    this.emit('disconnect');
  }

  async sendTransaction(transaction: Transaction, connection: Connection, opciones?: SendTransactionOptions) {
    const cuenta = this.cuenta;
    if (!cuenta || !transaction.feePayer?.equals(cuenta.publicKey)) {
      throw new Error('Conecta la cuenta temporal de práctica.');
    }
    if (transaction.instructions.length !== 1 ||
      transaction.instructions[0].programId.toBase58() !== String(REGISTRO_PROGRAM_ADDRESS) ||
      opciones?.signers?.length) {
      throw new Error('La cuenta temporal solo firma instrucciones del registro de ventas.');
    }
    await comprobarPrograma(connection);
    if (!window.confirm('¿Firmar esta operación del registro con SOL de prueba en Devnet?')) {
      throw new Error('User rejected la solicitud de firma.');
    }
    if (this.cuenta !== cuenta) throw new Error('La cuenta temporal se desconectó.');
    transaction.partialSign(cuenta);
    return connection.sendRawTransaction(transaction.serialize(), {
      preflightCommitment: 'confirmed',
      skipPreflight: false,
    });
  }
}

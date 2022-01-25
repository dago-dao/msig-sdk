import {PublicKey} from '@solana/web3.js'
import {ProposalBase, TransferLamports} from '@parrotfi/msig'
import {accounts} from './accounts'

export const PROPOSALS: ProposalBase[] = [
  new TransferLamports(
    // The memo string must be unique for a multisig. Use a timestamp as
    // prefix (by convention) to ensure its uniqueness.
    '2022-01-25T20:00:00+07:00 transfer lamport 0.999 SOL',
    accounts.dev_wallet,
    0.999 * 1e9, // 0.999 SOL
  ),
]

/** better json print for PublicKey */
export function setupJSONPrint() {
  PublicKey.prototype['toJSON'] = function () {
    return this.toBase58()
  }
}

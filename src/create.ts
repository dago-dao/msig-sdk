import {Keypair, PublicKey} from '@solana/web3.js'
import {
  buildMultisigProgram,
  batchCreateProposals,
  getMultisigContext,
} from '@parrotfi/msig'
import {readFileSync} from 'fs'
import {join, normalize} from 'path'
import {accounts} from './accounts'
import {PROPOSALS, setupJSONPrint} from './proposals'

async function createProposals() {
  const wallet = Keypair.fromSecretKey(
    Buffer.from(
      JSON.parse(
        readFileSync(normalize(join(__dirname, '../key.json')), {
          encoding: 'utf-8',
        }),
      ),
    ),
  )

  const program = buildMultisigProgram(
    'https://ssc-dao.genesysgo.net',
    new PublicKey('msigmtwzgXJHj2ext4XJjCDmpbcMuufFb5cHuwg6Xdt'),
    wallet,
  )

  await batchCreateProposals(
    await getMultisigContext(program, accounts.multisig),
    PROPOSALS,
    false,
    false,
  )
}

setupJSONPrint()
createProposals()

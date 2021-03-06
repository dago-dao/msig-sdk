import {Keypair, PublicKey} from '@solana/web3.js'
import {
  buildMultisigProgram,
  batchVerifyProposals,
  setupJSONPrint,
  getMultisigContext,
} from '@parrotfi/msig'
import {readFileSync} from 'fs'
import {join, normalize} from 'path'
import {accounts} from './accounts'
import {PROPOSALS} from './proposals'

async function verifyProposals() {
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

  await batchVerifyProposals(
    await getMultisigContext(program, accounts.multisig),
    PROPOSALS,
    true,
  )
}

setupJSONPrint()
verifyProposals()

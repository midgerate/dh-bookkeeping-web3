import { getDAOMetadata } from '@/services/getDAOMetadata'
import { getMinions } from '@/services/getMinions'
import { Moloch } from '@/types/DAO'
import fetchGraph from '@/utils/fetchGraph'

const GET_MOLOCH = `
query moloch($contractAddr: String!) {
  moloch(id: $contractAddr) {
    id
    minions {
      minionAddress
    }
    tokenBalances(where: {guildBank: true}) {
      token {
        tokenAddress
        symbol
        decimals
      }
      tokenBalance
    }
  }
}
`

type MolochData = {
  moloch: Moloch
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getVaultsProps = async (daoAddress: string) => {
  try {
    const daoMeta = await getDAOMetadata(daoAddress as string)

    const moloch = await fetchGraph<MolochData, { contractAddr: string }>(
      daoMeta.network,
      GET_MOLOCH,
      {
        contractAddr: daoMeta.contractAddress,
      }
    )

    const minions = await getMinions(daoMeta.contractAddress)

    return {
      daoMetadata: daoMeta,
      moloch: moloch.data.moloch,
      minions,
    }
  } catch (error) {
    return {
      error: {
        message: (error as Error).message,
      },
    }
  }
}
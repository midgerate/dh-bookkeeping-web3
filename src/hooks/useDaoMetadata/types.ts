export type DaoMetadata = {
  contractAddress: string
  network: string
  name: string
  description: string
  purpose: string
  version: string
  slug: string
  links: {
    website: string
    twitter: string
    discord: string
    telegram: string
    medium: string
    other: string
  }
  daosquarecco: number
  tags: string[]
  proposalConfig: null | unknown
  settings: null | unknown
  boosts: {
    transmutation: {
      active: boolean
      metadata: {
        paddingNumber: string
        burnRate: string
        exchangeRate: string
      }
    }
  } & {
    [minion: string]: Array<string>
  }
  allies: string[]
}

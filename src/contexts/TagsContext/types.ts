export type TagModel = {
  name: string
  income?: number
  outcome?: number
  balance?: number
  colorScheme?: string
}

export type TagsContextData = {
  tagList: TagModel[]
}

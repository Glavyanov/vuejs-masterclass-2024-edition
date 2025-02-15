export interface CreateNewTask {
  name: string
  description: string
  project: number
  profile_id: string
}

export type SelectOption = {
  label: string
  value: number | string
}

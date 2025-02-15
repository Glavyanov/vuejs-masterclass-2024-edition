export interface CreateNewTask {
  name: string
  description: string
  project_id: number
  collaborators?: string[]
}

export type SelectOption = {
  label: string
  value: number | string
}

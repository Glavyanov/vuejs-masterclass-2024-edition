import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})
  const getProfilesByIds = async (ids: string[]) => {
    const { data, error, status } = await groupedProfilesQuery(ids)
    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filtered = items.filter((item) => item.collaborators.length)
    const promises = filtered.map((item) => getProfilesByIds(item.collaborators))

    const result = await Promise.all(promises)

    filtered.forEach((item, index) => {
      groupedCollabs.value[item.id] = result[index]
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs
  }
}

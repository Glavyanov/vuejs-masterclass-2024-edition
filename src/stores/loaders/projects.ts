import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])

  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const getProjects = async () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data }: { data: Projects[] }) => {
        if (JSON.stringify(data) !== JSON.stringify(projects.value)) {
          loadProjects.delete('projects')
          if (!error && data) projects.value = data
        }
      })
    }

    const { data, error, status } = await loadProjects('projects')
    if (data) projects.value = [...data]
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }

  return {
    projects,
    getProjects
  }
})

import { projectsQuery, projectQuery, type Projects, type Project } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  const validateCache = async () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(data) !== JSON.stringify(projects.value)) {
          loadProjects.delete('projects')
          if (data) projects.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')
    if (data) projects.value = [...data]
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    validateCache()
  }

  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug)
    if (data) project.value = { ...data }
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }

  return {
    projects,
    project,
    getProjects,
    getProject
  }
})

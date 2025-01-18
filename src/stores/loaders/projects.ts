import {
  projectsQuery,
  projectQuery,
  type Projects,
  type Project,
  updateProjectQuery
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  interface ValidateCacheParams {
    ref: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loadFn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({ ref, query, key, loadFn }: ValidateCacheParams) => {
    const computedQuery = typeof query === 'function' ? query(key) : query
    if (ref.value) {
      computedQuery.then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(ref.value)) {
          loadFn.delete(key)
          if (!error && data) ref.value = data
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

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loadFn: loadProjects
    })
  }

  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug)
    if (data) project.value = { ...data }
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loadFn: loadProject
    })
  }

  const updateProject = async () => {
    if (!project.value) return
    const { tasks, id, ...projectData } = project.value
    const { error, status } = await updateProjectQuery(id, project.value)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }

  return {
    projects,
    project,
    getProjects,
    getProject,
    updateProject
  }
})

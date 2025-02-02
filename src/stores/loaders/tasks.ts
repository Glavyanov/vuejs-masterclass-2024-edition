import { taskQuery, updateTaskQuery, type Task } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const task = ref<Task | null>(null)

  const loadTask = useMemoize(async (id: string) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof task
    query: typeof taskQuery
    id: string
    loadFn: typeof loadTask
  }

  const validateCache = ({ ref, query, id, loadFn }: ValidateCacheParams) => {
    const computedQuery = typeof query === 'function' ? query(id) : query
    if (ref.value) {
      computedQuery.then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(ref.value)) {
          loadFn.delete(id)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getTask = async (id: string) => {
    const { data, error, status } = await loadTask(id)
    if (data) task.value = { ...data }
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    validateCache({
      ref: task,
      query: taskQuery,
      id,
      loadFn: loadTask
    })
  }
  const updateTask = async () => {
    if (task.value) {
      const { id, projects, ...taskData } = task.value
      const { error, status } = await updateTaskQuery(task.value.id, taskData)
      if (error) {
        useErrorStore().setError({ error, customCode: status })
      }
    }
  }

  return {
    task,
    getTask,
    updateTask
  }
})

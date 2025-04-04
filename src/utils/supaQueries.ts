import { supabase } from '@/lib/supabaseClient'
import type { CreateNewTask } from '@/types/CreateNewTaskForm'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects(
      id, name, slug)
  `)

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
        *,
        tasks (
          id,
          name,
          status,
          due_date
        )
      `
    )
    .eq('slug', slug)
    .single()

export const projectQueryById = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
        *,
        tasks (
          id,
          name,
          status,
          due_date
        )
      `
    )
    .eq('id', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery | typeof projectQueryById>>

export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
    *,
    projects(
      id, name, slug)
  `
    )
    .eq('id', id)
    .single()

export type Task = QueryData<ReturnType<typeof taskQuery>>

export const profileQuery = ({ column, value }: { column: string; value: string }) =>
  supabase.from('profiles').select().eq(column, value).single()

export const profilesQuery = supabase.from('profiles').select('id, full_name')

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const groupedProfilesQuery = (ids: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', ids)

export const updateProjectQuery = (id: number, project: Omit<Partial<Project>, 'id' | 'tasks'>) =>
  supabase.from('projects').update(project).eq('id', id)

export const updateTaskQuery = (id: number, task: Omit<Partial<Task>, 'id' | 'projects'>) =>
  supabase.from('tasks').update(task).eq('id', id)

export const createTaskQuery = (task: CreateNewTask) => supabase.from('tasks').insert(task)

export const deleteTaskQuery = (id: number) => supabase.from('tasks').delete().eq('id', id)

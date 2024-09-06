import { supabase } from "@/lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *, 
    projects(
      id, name, slug)
  `)

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const projectsQueries = supabase.from('projects').select();
export type Projects = QueryData<typeof projectsQueries>

export const projectQuery = (slug: string, isById: boolean = false ) => !isById
  ? supabase
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
      `)
      .eq('slug', slug)
      .single() 
  : supabase
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
    `)
    .eq('id', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const taskQuery = (id: string) => 
  supabase.from('tasks').select(`
    *, 
    projects(
      id, name, slug)
  `)
    .eq('id', id)
    .single()

export type Task = QueryData<ReturnType<typeof taskQuery>>
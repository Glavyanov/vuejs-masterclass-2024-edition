import { useDateFormat } from '@vueuse/core'

export const formatDate = (date: string, format: string): string =>
  useDateFormat(date, format).value

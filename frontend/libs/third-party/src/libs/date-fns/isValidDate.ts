import { isValid } from "date-fns"

export const _isValidDate = (date: Date): boolean => {
  return isValid(date)
}

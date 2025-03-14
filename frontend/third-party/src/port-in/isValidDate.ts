import { _isValidDate } from "@libs/date-fns/isValidDate";
// import { _isValidDate } from "@libs/moment/isValidDate";

/**
 * Checks if the provided date is valid.
 *
 * @remarks
 * The function `_isValidDate` is prefixed with an underscore to indicate that it is an
 * internal library function and should not be exported in `rsbuild.config.ts`.
 * This approach ensures that internal utility functions can be modified or replaced
 * without affecting the public API of the microfrontend. By keeping such functions internal,
 * we maintain the same functionality while allowing for easier updates and maintenance
 * of the library.
 *
 * @param date - The date to be validated.
 * @returns `true` if the date is valid, otherwise `false`.
 */
export const isValidDate = (date: Date): boolean => _isValidDate(date)


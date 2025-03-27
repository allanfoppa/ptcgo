import moment from "moment";

export const _isValidDate = (date: Date): boolean => {
  return moment(date).isValid();
}

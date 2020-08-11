import { DateTimeFormats } from "enums";
import moment from "moment";

// Helpers need to have this format to moment be able to parse them
const MOMENT_HELPER_DATE_FORMAT = "YYYY-MM-DD";

export const extractDateString = (date: Date | moment.Moment): string => {
  if (!date) {
    return "";
  }

  return moment(date).format(MOMENT_HELPER_DATE_FORMAT);
};

export const extractTimeString = (date: Date | moment.Moment): string => {
  if (!date) {
    return "";
  }

  return moment(date).format(DateTimeFormats.HoursMinutesSeconds);
};

export const mergeDateTime = (
  date: Date | moment.Moment,
  time: Date | moment.Moment
): moment.Moment | undefined => {
  if (!date || !time) {
    return;
  }

  const mergedDateTimeFromStrings = moment(
    `${extractDateString(date)} ${extractTimeString(time)}`
  );

  return mergedDateTimeFromStrings;
};

export const removeTimeFromDate = (
  date: Date | moment.Moment
): moment.Moment | undefined => {
  if (!date) {
    return;
  }

  return moment(moment(date).format(MOMENT_HELPER_DATE_FORMAT));
};

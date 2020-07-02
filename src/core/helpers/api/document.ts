import moment from "moment";

// Helpers need to have this format to moment be able to parse them
export const MOMENT_HELPER_DATE_FORMAT = "YYYY-MM-DD";
export const MOMENT_HELPER_TIME_FORMAT = "HH:mm";

export const extractDateString = (date: Date | moment.Moment): string => {
  if (!date) return "";
  return moment(date).format(MOMENT_HELPER_DATE_FORMAT);
};

export const extractTimeString = (date: Date | moment.Moment): string => {
  if (!date) return "";
  return moment(date).format(MOMENT_HELPER_TIME_FORMAT);
};

export const mergeDateTime = (
  date: Date | moment.Moment,
  time: Date | moment.Moment
): moment.Moment | undefined => {
  if (!date || !time) return;
  const extractedDateString = extractDateString(date);
  const extractedTimeString = extractTimeString(time);
  const mergedDateTimeFromStrings = moment(
    `${extractedDateString} ${extractedTimeString}`
  );
  return mergedDateTimeFromStrings;
};

export const removeTimeFromDate = (
  date: Date | moment.Moment
): moment.Moment | undefined => {
  if (!date) return;
  return moment(moment(date).format(MOMENT_HELPER_DATE_FORMAT));
};

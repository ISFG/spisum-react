import moment from "moment";

export const tryToGetLastReadDate = (timestampText?: string) => {
  if (!timestampText) {
    return;
  }

  let jsonText;

  try {
    jsonText = JSON.parse(timestampText);
  } catch (err) {
    return;
  }

  let values = Object.values(jsonText);
  if (
    values.length &&
    (values[0] as { downloadTimestamp: number }).downloadTimestamp
  ) {
    values = values.map(
      (x) => (x as { downloadTimestamp: number }).downloadTimestamp
    );
  }

  const minTimestamp = Math.min(
    ...(values
      .map((x) => parseInt(x as string, 0))
      .filter((x) => x) as number[])
  );

  return moment.utc(minTimestamp).local().toDate();
};

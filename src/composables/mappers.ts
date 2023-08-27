import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function mapTimestampsToDaysSince(timestamp: number): number {
  // get original timestamp, convert to start of date, take the difference between today in days
  return dayjs().diff(dayjs(timestamp).startOf('day'), "day");
}

// For example, 0 -> today, 1 -> yesterday, 2 -> two days ago, etc.
export function mapDaysSinceToTimestamps() {}

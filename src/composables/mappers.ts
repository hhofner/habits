import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function mapTimestampsToDaysSince(timestamp: number): number {
  return dayjs().diff(timestamp, "day");
}

// For example, 0 -> today, 1 -> yesterday, 2 -> two days ago, etc.
export function mapDaysSinceToTimestamps() {}

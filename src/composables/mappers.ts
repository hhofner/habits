import dayjs from "dayjs";
import { HABIT_FREQUENCY } from '../types'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function mapTimestampsToDaysSince(timestamp: number): number {
  // get original timestamp, convert to start of date, take the difference between today in days
  return dayjs().diff(dayjs(timestamp).startOf("day"), "day");
}

// For example, 0 -> today, 1 -> yesterday, 2 -> two days ago, etc.
export function mapDaysSinceToTimestamps() {}


const DEFAULT_COLOR = "bg-gray-500"
export function getColorChosen(color: string) {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "blue":
      return "bg-sky-500";
    case "indigo":
      return "bg-indigo-500";
    case "rose":
      return "bg-rose-500";
    case "emerald":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
}

export function getSecondaryColorChosen(color: string) {
  switch (color) {
    case "red":
      return "bg-red-300/75";
    case "green":
      return "bg-green-300/75";
    case "yellow":
      return "bg-yellow-500/50";
    case "blue":
      return "bg-sky-300/75";
    case "indigo":
      return "bg-indigo-300/75";
    case "rose":
      return "bg-rose-300/75";
    case "emerald":
      return "bg-emerald-300/75";
    default:
      return "bg-gray-300";
  }
}

export function getColor(days: Array<number>, listedDay: number, color: string, frequency: HABIT_FREQUENCY): string {
  switch (frequency) {
    case HABIT_FREQUENCY.EVERYDAY:
      return days.includes(listedDay) ? getColorChosen(color) : ''
    case HABIT_FREQUENCY.EVERY_OTHER_DAY:
      if (days.includes(listedDay)) {
        return getColorChosen(color)
      } else if (listedDay <= 5) {
        if (days.includes(listedDay + 1)) {
          return getSecondaryColorChosen(color)
        }
      } 
      return DEFAULT_COLOR
    default:
      return DEFAULT_COLOR
  }
}

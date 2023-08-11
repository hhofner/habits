import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export function mapTimestampsToDaysSince(timestamp: number): number {
	const timeSince = parseInt(dayjs(timestamp).fromNow().split(' ')[0])
	const timeNotifier = dayjs(timestamp).fromNow().split(' ')[1]
	console.log("timeSince", timeSince)
	console.log("timeNotifier", timeNotifier)

	if (timeNotifier === 'days') {
		return timeSince
	} else if (timeNotifier === 'hours' || timeNotifier === 'minutes' || timeNotifier === 'seconds') {
		return 0
	} else {
		// meh, just signifies not to care about this
		return -1
	}
}

// For example, 0 -> today, 1 -> yesterday, 2 -> two days ago, etc.
export function mapDaysSinceToTimestamps() {
}

/**
 * Formats the given time in seconds into a string in the format "HH:MM:SS".
 *
 * @param {number} timeInSeconds - The time value in seconds to be formatted.
 * @returns {string} - The formatted time string in format "HH:MM:SS".
 *
 * @example
 * const remainingTime = formatTimerTime(300); // -> "05:00"
 * formatTimerTime(6789); // -> "01:53:09"
 */
export const formatTimerTime = (timeInSeconds: number): string => {
  const hours = getHours(timeInSeconds);
  const minutes = getMinutes(timeInSeconds);
  const seconds = getSeconds(timeInSeconds);

  let formattedTime = "";

  // If there are hours, append them to the formatted time string
  if (hours > 0) {
    formattedTime += formatTimeUnit(hours);
  }

  // Append minutes and seconds
  formattedTime += formatTimeUnit(minutes) + formatTimeUnit(seconds);

  // Remove the trailing colon: `01:53:09:` --> `01:53:09`
  return formattedTime.slice(0, -1);
};

/**
 * Calculates the number of hours from the given time in seconds.
 *
 * @param {number} timeInSeconds - The time value in seconds.
 * @returns {number} - The number of hours.
 */
const getHours = (timeInSeconds: number): number => {
  return Math.floor(timeInSeconds / 3600); // 3600s = 1h
};

/**
 * Calculates the number of minutes from the given time in seconds.
 *
 * @param {number} timeInSeconds - The time value in seconds.
 * @returns {number} - The number of minutes.
 */
const getMinutes = (timeInSeconds: number): number => {
  return Math.floor((timeInSeconds % 3600) / 60);
};

/**
 * Calculates the number of seconds from the given time in seconds.
 *
 * @param {number} timeInSeconds - The time value in seconds.
 * @returns {number} - The number of seconds.
 */
const getSeconds = (timeInSeconds: number): number => {
  return timeInSeconds % 60;
};

/**
 * Formats a time unit (hours, minutes, or seconds) into a string with
 * leading zeros.
 *
 * @param {number} timeUnit - The time unit to be formatted.
 * @returns {string} - The formatted time unit string.
 */
const formatTimeUnit = (timeUnit: number): string => {
  return `${timeUnit.toString().padStart(2, "0")}:`;
};

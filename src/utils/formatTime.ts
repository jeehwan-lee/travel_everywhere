function formatTime(ms: number) {
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const days = Math.floor(ms / day);

  if (days < 0) {
    return "";
  }

  const lastHour = Math.floor((ms - days * day) / hour);
  const lastMinute = Math.floor((ms - days * day - lastHour * hour) / minute);
  const lastSecond = Math.floor(
    (ms - days * day - lastHour * hour - lastMinute * minute) / 1000
  );

  const HH = `${lastHour}`.padStart(2, "0");
  const mm = `${lastMinute}`.padStart(2, "0");
  const SS = `${lastSecond}`.padStart(2, "0");

  return days > 0 ? `${days}일 ${HH}:${mm}:${SS}` : `${HH}:${mm}:${SS}`;
}

export default formatTime;

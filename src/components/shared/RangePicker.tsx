import { DayPicker, DateRange } from "react-day-picker";
import { ko } from "date-fns/locale";
import { differenceInDays, format, isSameDay, parseISO } from "date-fns";

interface RangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void;
}

function RangePicker({ startDate, endDate, onChange }: RangePickerProps) {
  const today = new Date();

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange === null) {
      return;
    }

    if (
      dateRange?.from &&
      dateRange?.to &&
      isSameDay(dateRange?.from, dateRange?.to)
    ) {
      return;
    }

    onChange({
      from:
        dateRange?.from != null
          ? format(dateRange.from, "yyyy-MM-dd")
          : undefined,
      to:
        dateRange?.to != null ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      nights:
        dateRange?.from && dateRange?.to
          ? differenceInDays(dateRange?.to, dateRange?.from)
          : 0,
    });
  };

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  };

  return (
    <DayPicker
      locale={ko}
      mode="range"
      numberOfMonths={5}
      defaultMonth={today}
      onSelect={handleDayClick}
      selected={selected}
    />
  );
}

export default RangePicker;

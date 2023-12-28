import { DayPicker, DateRange } from "react-day-picker";
import { ko } from "date-fns/locale";
import { differenceInDays, format, isSameDay, parseISO } from "date-fns";
import styled from "@emotion/styled";
import { colors } from "../../styles/colorPalette";

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
    <Container>
      <DayPicker
        locale={ko}
        mode="range"
        numberOfMonths={5}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
      />
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0px 30px;
  }

  .rdp-caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-table {
    width: 100%;
  }

  .rdp-head .rdp-head_row {
    font-size: 12px;
    height: 45px;
    color: ${colors.gray400};
    font-weight: bold;
  }

  .rdp-tbody .rdp-row {
    height: 45px;
  }

  .rdp-cell .rdp-button {
    position: relative;
    width: 100%;
    line-height: 45px;
  }

  .rdp-day_selected {
    background-color: ${colors.blue100};
  }

  .rdp-cell .rdp-day_range_start,
  .rdp-cell .rdp-day_range_end {
    color: ${colors.white};
  }

  .rdp-cell .rdp-day_range_start::after,
  .rdp-cell .rdp-day_range_end::after {
    z-index: -1;
    display: block;
    width: calc(100% - 1px);
    height: 45px;
    position: absolute;
    top: 50%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.blue};
    content: "";
  }
`;

export default RangePicker;
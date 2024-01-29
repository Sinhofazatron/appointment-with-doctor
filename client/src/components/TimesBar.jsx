import {
  eachMinuteOfInterval,
  endOfDay,
  endOfToday,
  isSameMinute,
  set,
  startOfDay,
  startOfToday,
} from "date-fns";
import React, { memo } from "react";
import { cn } from "../lib/utils";

// eslint-disable-next-line react/display-name
const TimesBar = memo(({ times }) => {
  const StartOfWeek = startOfDay(times[0]);
  const EndtOfWeek = endOfDay(times[0]);
  const startHour = set(StartOfWeek, { hours: 9 });
  const endHour = set(EndtOfWeek, { hours: 17 });
  let hoursInDay = eachMinuteOfInterval(
    {
      start: startHour,
      end: endHour,
    },
    { step: 60 }
  );

  console.log(times);

  return (
    <div
      className={cn(
        `w-[42px]`,
        "flex justify-center rounded-md overflow-hidden"
      )}
    >
      <div className="flex rounded-md">
        {hoursInDay.map((hour, i) => {
          return (
            <div
              key={i}
              className={cn(
                times.some((time) => isSameMinute(hour, time)) &&
                  "h-[4px] w-[.5px] bg-green-300",
                !times.some((time) => isSameMinute(hour, time)) &&
                  "h-[4px] w-[1px] bg-gray-100"
              )}
            />
          );
        })}
      </div>
    </div>
  );
});

export default TimesBar;

import { useEffect, useMemo, useState } from "react";
import { cn, dayNames } from "../lib/utils";
import {
  add,
  addDays,
  addHours,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  parseISO,
  set,
  startOfDay,
  startOfToday,
  startOfWeek,
  startOfTomorrow,
} from "date-fns";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import AvailableHours from "../components/Hours";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentSuccess } from "../redux/appointment/appointmentSlice";

const reservations = [
  addHours(startOfToday(), 5).toString(),
  addHours(startOfToday(), 6).toString(),
  addHours(startOfToday(), 7).toString(),
  addHours(startOfToday(), 8).toString(),
  addHours(startOfToday(), 9).toString(),
  addDays(new Date(addHours(startOfToday(), 4)), 3).toString(),
];

export default function Calendar() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentAppointments } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointment/get");
        const data = await res.json();

        dispatch(getAppointmentSuccess(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  // display div of availables times
  const [calendarTouched, setCalendarTouched] = useState(false);

  // handle dates
  let tomorrow = startOfTomorrow();
  let today = startOfToday();
  let [currentMonth, setCurrentMonth] = useState(format(tomorrow, "MMM-yyyy"));
  let [selectedDay, setSelectedDay] = useState(today);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
      }),
    [firstDayCurrentMonth]
  );

  // next and prev month functions
  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // get available times for the selected day
  const allTimes = useMemo(() => {
    const StartOfToday = startOfDay(selectedDay);
    const endOfToday = endOfDay(selectedDay);
    // change your working hours here
    const startHour = set(StartOfToday, { hours: 9 });
    const endHour = set(endOfToday, { hours: 17 });
    let hoursInDay = eachMinuteOfInterval(
      {
        start: startHour,
        end: endHour,
      },
      { step: 60 }
    );

    // filter the available hours
    let freeTimes = hoursInDay.filter(
      (hour) => !reservations.includes(parseISO(hour.toISOString()).toString())
    );

    return freeTimes;
  }, [selectedDay]);

  // Comparison of free time and busy time
  let allAppointment;
  const allBusyTimes = [];

  if (currentAppointments) {
    allAppointment = currentAppointments.map((item) => item.appointmentHour);

    for (let appointment of allAppointment) {
      appointment.map((item) => allBusyTimes.push(item));
    }
  }

  let allTimesArray = allTimes.map((item) => String(new Date(item)));
  let allBusyTimesArray = allBusyTimes.map((item) => String(new Date(item)));
  const filteredArray = allTimesArray.filter(
    (value) => !allBusyTimesArray.includes(value)
  );

  return (
    <div className="flex flex-col w-[70%] md:w-100% items-center gap-2">
      {/* calendar implementation */}
      <div className="flex flex-col gap-2 h-[23rem] w-[25rem] mt-4">
        {/* calendar header */}
        <div className="grid grid-cols-3">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isThisMonth(new Date(currentMonth))}
          >
            <ChevronLeft
              size={20}
              aria-hidden="true"
              className={cn(
                isThisMonth(new Date(currentMonth)) && "text-gray-300"
              )}
            />
          </button>
          <h2 className="font-semibold text-orange-950 justify-center flex">
            {format(firstDayCurrentMonth, " MMMM yyyy")}
          </h2>
          <button
            type="button"
            className="flex justify-end"
            onClick={nextMonth}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {/* calendar body */}
        <div>
          <div className="grid grid-cols-7 mt-4">
            {dayNames.map((day, i) => {
              return (
                <div
                  key={i}
                  className={cn(
                    "flex justify-center items-center text-sm text-blue-500 w-full py-2",
                    {
                      "text-red-600 bg-red-200 rounded-lg":
                        day === "Sun" || day === "Sat",
                    }
                  )}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => {
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day) - 1],
                    "h-14 justify-center flex items-center",
                    (getDay(day) === 0 || getDay(day) === 6) &&
                      "bg-red-200 rounded-lg"
                  )}
                >
                  <button
                    onClick={() => {
                      setCalendarTouched(true);
                      setSelectedDay(day);
                    }}
                    className={cn(
                      "w-12 h-12 flex flex-col p-2 justify-center items-center rounded-xl gap-0 group bg-green-200 relative group",
                      isEqual(day, selectedDay) &&
                        "bg-green-400 text-slate-900 text-lg",
                      isBefore(day, tomorrow) &&
                        "text-red-800 bg-violet-200 cursor-not-allowed",
                      isBefore(day, tomorrow) && "cursor-not-allowed",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-blue-200",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900"
                    )}
                    disabled={!currentUser || isBefore(day, tomorrow)}
                    title={!currentUser ? "Необходима регистрация" : ""}
                  >
                    <time
                      dateTime={format(day, "yyyy-MM-dd")}
                      className={cn(
                        "group-hover:text-lg",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold"
                      )}
                    >
                      {format(day, "d")}
                    </time>

                    {String(new Date(selectedDay)) ==
                    String(new Date(today)) ? null : (
                      <CheckCircle2
                        className={cn(
                          "hidden",
                          isEqual(day, selectedDay) &&
                            "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-orange-900"
                        )}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={cn(`hidden`, calendarTouched && "block")}>
        <span className="flex items-center w-full justify-center gap-1"></span>
        <AvailableHours freeTimes={filteredArray} />
      </div>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

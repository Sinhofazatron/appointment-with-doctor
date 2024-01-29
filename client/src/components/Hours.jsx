import { format, isSameMinute } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import { memo, useState } from "react";
import { cn } from "../lib/utils";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const AvailableHours = memo(({ freeTimes }) => {
  const [selectedTime, setSelectedTime] = useState();
  const [loading, setLoading] = useState(false)
  const { currentUser } = useSelector((state) => state.user);
  
  //   if (freeTimes) {
  //     let a = String(new Date(freeTimes[3]));
  //     console.log(
  //       a === "Sun Jan 28 2024 12:00:00 GMT+0300 (Москва, стандартное время)"
  //     );

  //     let b = String(new Date("2024-01-28T09:00:00.000Z"));

  //     console.log(a == b);
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/appointment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentHour: selectedTime,
          userRef: currentUser._id,
          userName: currentUser.username
        }),
      });
      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        toast.error(data.message)
        setError(data.message);
      }

      toast.success('Вы успешно записаны к доктору')
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="mb-4">
        Доступное колличество сеансов:{" "}
        <span className="font-semibold text-orange-950">
          {freeTimes.length}
        </span>
      </span>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6  text-md gap-2">
        {freeTimes.map((hour, hourIdx) => (
          <div key={hourIdx}>
            <button
              type="button"
              className={cn(
                "bg-green-200 rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]",
                selectedTime &&
                  isSameMinute(selectedTime, hour) &&
                  "bg-green-400 text-gray-800"
              )}
              onClick={() => setSelectedTime(hour)}
            >
              <CheckCircle2
                className={cn(
                  "w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5 text-orange-900",
                  selectedTime && isSameMinute(selectedTime, hour) && "block"
                )}
              />
              {format(hour, "HH:mm")}
            </button>
          </div>
        ))}
      </div>
      {selectedTime && (
        <div className="w-full py-2 text-center">
          <div>
            <span>Выбранное время для записи: </span>
            <span className="font-semibold text-rose-950 pl-1">
              {format(selectedTime, "dd MMMM yyyy HH:mm")}
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!currentUser || loading}
            title={!currentUser ? "Необходима регистрация" : ""}
            className={cn(
              "bg-green-600 rounded-lg px-4 py-1 text-white relative hover:bg-green-700 mt-5 transition",
              !currentUser && "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
            )}
          >
            Записаться
          </button>
        </div>
      )}
    </div>
  );
});

export default AvailableHours;

import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function UsersList() {
  const { currentAppointments } = useSelector((state) => state.appointment);

  return (
    <div className="max-md:mt-8">
      <p className="mt-3 mb-7 font-semibold text-lg">Список пациентов:</p>
      <ul>
        {currentAppointments.map((item) => (
          <li className="mb-3 max-md:flex max-md:items-center max-md:gap-4" key={item._id}>
            <p className="ml-3 font-semibold">{item.userName}:</p>
            <span className="text-sm max-md:mt-1 text-right text-rose-950 ">
              {dayjs(item.appointmentHour).format("DD-MM-YYYY HH:mm")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

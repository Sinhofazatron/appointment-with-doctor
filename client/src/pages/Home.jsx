import Calendar from "../components/Calendar";
import UsersList from "../components/UsersList";

export default function Home() {

  return (
    <div className="text-center">
      <p className="font-serif text-xl sm:text-2xl font-semibold text-teal-900 pt-5 pb-8 sm:px-2">
        Вы можете записаться к врачу с 9:00 до 17:00
      </p>
      <div className="flex max-md:flex-col">
        <Calendar />
        <UsersList />
      </div>
    </div>
  );
}

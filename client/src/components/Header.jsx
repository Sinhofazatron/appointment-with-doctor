import { GiPlagueDoctorProfile } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2 px-4 bg-slate-200 shadow-md">
      <div className="">
        <Link to='/' className='flex items-center gap-2'>
          <GiPlagueDoctorProfile size={24} className="fill-blue-900" />
          <h1 className="text-lg font-semibold">
            <span>Your</span>
            <span className="text-blue-900">Doctor</span>
          </h1>
        </Link>
      </div>
      <div className="flex gap-4 text-slate-700">
        <p>Name of User</p>
		<Link to='/sign-in'>
        <button className="rounded bg-blue-500 hover:bg-blue-600 px-2 transition text-white">
          Войти
        </button></Link>
      </div>
    </header>
  );
}

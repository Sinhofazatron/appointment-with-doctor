import { GiPlagueDoctorProfile } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      toast.success("Вы успешно вышли");
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <header className="flex justify-between items-center py-2 px-4 bg-slate-200 shadow-md">
      <div className="">
        <Link to="/" className="flex items-center gap-2">
          <GiPlagueDoctorProfile size={24} className="fill-blue-900" />
          <h1 className="text-lg font-semibold">
            <span>Your</span>
            <span className="text-blue-900">Doctor</span>
          </h1>
        </Link>
      </div>
      <div className="flex gap-4 text-slate-700">
        <p>{currentUser ? currentUser.username : ""}</p>
        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="rounded bg-slate-500 hover:bg-slate-600 px-2 transition text-white"
          >
            Выйти
          </button>
        ) : (
          <Link to="/sign-in">
            <button className="rounded bg-slate-500 hover:bg-slate-600 px-2 transition text-white">
              Войти
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  let loading = false;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error(data.message)
        // dispatch(signInFailure(data.message));
        return;
      }

      toast.success('Вы успешно вошли!')
      // dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Авторизация</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="password"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className=" mt-4 bg-slate-500 text-white p-3 rounded-lg uppercase hover:bg-slate-600 hover:shadow-lg transition min-w-[15rem] m-auto disabled:opacity-80 disabled:hover:bg-slate-500 disabled:hover:opacity-80 disabled:hover:shadow-none"
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Не зарегистрированы?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Регистрация</span>
        </Link>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        return;
      }

      toast.success('Пользователь успешно создан!')
      setError(null);
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Регистрация</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Имя пользователя"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="username"
          onChange={handleChange}
          required
        />
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
          {loading ? "Загрузка..." : "Регистрация"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Войти</span>
        </Link>
      </div>
      {error && (
        <div className="flex items-center justify-center">
          <p className="text-red-500 mt-5">{error}</p>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.response?.data?.message || "Login failed");
      setErrorType(error.response?.data?.type || null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Logowanie</h2>

      {loginError && (
        <div className="animate-fade-in mb-4 rounded bg-red-100 p-3 text-red-700">
          {loginError}
          {errorType === "UNVERIFIED_ACCOUNT" ? (
            <div className="mt-2">
              Sprawdź swoją skrzynkę odbiorczą w celu znalezienia linku
              aktywacyjnego lub{" "}
              <Link to="/email-verification" className="font-semibold">
                kliknij tutaj
              </Link>
            </div>
          ) : null}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded border p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", {
              required: "E-mail jest wymagany",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Niepoprawny format adresu e-mail",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="password">
            Hasło
          </label>
          <input
            id="password"
            type="password"
            className={`w-full rounded border p-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Hasło jest wymagane",
              minLength: {
                value: 6,
                message: "Hasło musi mieć conajnmniej 6 znaków",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
        >
          {submitting ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const { register: registerUser, error: authError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const { confirmPassword, ...userData } = data;

      await registerUser(userData);
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Zarejestruj nowego użytkownika
      </h2>

      {authError && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-gray-700" htmlFor="first_name">
              Imię
            </label>
            <input
              id="first_name"
              type="text"
              className={`w-full rounded border p-2 ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-gray-700" htmlFor="last_name">
              Nazwisko
            </label>
            <input
              id="last_name"
              type="text"
              className={`w-full rounded border p-2 ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded border p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={`w-full rounded border p-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full rounded border p-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="voivodeship_id">
            Voivodeship ID
          </label>
          <input
            id="voivodeship_id"
            type="number"
            className={`w-full rounded border p-2 ${
              errors.voivodeship_id ? "border-red-500" : "border-gray-300"
            }`}
            {...register("voivodeship_id", {
              required: "Voivodeship ID is required",
            })}
          />
          {errors.voivodeship_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.voivodeship_id.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="group_link">
            Group Link (optional)
          </label>
          <input
            id="group_link"
            type="url"
            className="w-full rounded border border-gray-300 p-2"
            {...register("group_link")}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="facebook_link">
            Facebook Link (optional)
          </label>
          <input
            id="facebook_link"
            type="url"
            className="w-full rounded border border-gray-300 p-2"
            {...register("facebook_link")}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full rounded border p-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full rounded border p-2 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
        >
          {submitting ? "Rejestrowanie..." : "Zarejestruj"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

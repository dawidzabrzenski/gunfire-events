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
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      {authError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              id="first_name"
              type="text"
              className={`w-full p-2 border rounded ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              id="last_name"
              type="text"
              className={`w-full p-2 border rounded ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-2 border rounded ${
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
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={`w-full p-2 border rounded ${
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
            <p className="mt-1 text-red-500 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full p-2 border rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && (
            <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="voivodeship_id">
            Voivodeship ID
          </label>
          <input
            id="voivodeship_id"
            type="number"
            className={`w-full p-2 border rounded ${
              errors.voivodeship_id ? "border-red-500" : "border-gray-300"
            }`}
            {...register("voivodeship_id", {
              required: "Voivodeship ID is required",
            })}
          />
          {errors.voivodeship_id && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.voivodeship_id.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="group_link">
            Group Link (optional)
          </label>
          <input
            id="group_link"
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("group_link")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="facebook_link">
            Facebook Link (optional)
          </label>
          <input
            id="facebook_link"
            type="url"
            className="w-full p-2 border border-gray-300 rounded"
            {...register("facebook_link")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full p-2 border rounded ${
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
            <p className="mt-1 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full p-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function VerifyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [error, setError] = useState(null);
  const { resendVerificationEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError(null);
    setResponse({ type: "", message: "" });

    try {
      const res = await resendVerificationEmail(data.email);
      setResponse({ type: "success", message: res.message });
      reset();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Wysłanie linku nie powiodło się";

      setResponse({ type: "error", message: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Wyślij ponownie link aktywacyjny
        </h2>

        {response.message && (
          <div
            className={`${response.type === "success" ? "border-green-400 bg-green-200 text-green-700" : "border-red-400 bg-red-200 text-red-700"} rounded border px-4 py-3 text-sm`}
          >
            {response.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="twoj@email.com"
              className={`${errors.email ? "border-red-500" : "border-gray-300"} mt-1 w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:outline-none`}
              {...register("email", {
                required: "E-mail jest wymagany",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Niepoprawny format adresu e-mail",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || !isDirty}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Wysyłanie..." : "Wyślij link"}
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = ({ success }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setRegisterError(null);

    try {
      const role = isOrganizer ? "organizer" : "user";
      const { confirmPassword, ...userData } = data;

      if (userData.voivodeship_id === "") {
        userData.voivodeship_id = null;
      }

      await registerUser({ ...userData, role });
      navigate("/register", { state: { success: true } });
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto mt-10 rounded-lg bg-green-100 p-6 text-center shadow-md dark:bg-gray-800">
        <p className="text-xl font-semibold text-green-700">
          Rejestracja zakończona sukcesem! Sprawdź skrzynkę e-mail i aktywuj
          konto.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Zarejestruj nowego użytkownika
      </h2>

      {registerError && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {registerError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-stone-200 py-2">
          <input
            checked={isOrganizer}
            onChange={() => setIsOrganizer((val) => !val)}
            type="checkbox"
            className="size-4"
          />
          <p className="font-bold">Zarejestruj jako organizator</p>
        </div>
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
                required: "Imię jest wymagane",
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
              {...register("last_name", { required: "Nazwisko jest wymagane" })}
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
            Adres e-mail
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

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="username">
            Nazwa użytkownika
          </label>
          <input
            id="username"
            type="text"
            className={`w-full rounded border p-2 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            {...register("username", {
              required: "Nazwa użytkownika jest wymagana",
              minLength: {
                value: 3,
                message: "Nazwa użytkownika musi mieć conajmniej 3 znaki",
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
            Numer telefonu (opcjonalne)
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full rounded border p-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="voivodeship_id">
            Województwo (opcjonalne)
          </label>
          <select
            id="voivodeship_id"
            className={`w-full rounded border p-2 ${
              errors.voivodeship_id ? "border-red-500" : "border-gray-300"
            }`}
            {...register("voivodeship_id")}
            defaultValue=""
          >
            <option value="" disabled>
              -- Wybierz województwo --
            </option>
            <option value="1">Dolnośląskie</option>
            <option value="2">Kujawsko-Pomorskie</option>
            <option value="3">Lubelskie</option>
            <option value="4">Lubuskie</option>
            <option value="5">Łódzkie</option>
            <option value="6">Małopolskie</option>
            <option value="7">Mazowieckie</option>
            <option value="8">Opolskie</option>
            <option value="9">Podkarpackie</option>
            <option value="10">Podlaskie</option>
            <option value="11">Pomorskie</option>
            <option value="12">Śląskie</option>
            <option value="13">Świętokrzyskie</option>
            <option value="14">Warmińsko-Mazurskie</option>
            <option value="15">Wielkopolskie</option>
            <option value="16">Zachodniopomorskie</option>
          </select>
          {errors.voivodeship_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.voivodeship_id.message}
            </p>
          )}
        </div>

        {isOrganizer && (
          <div className="animate-fade-in mb-4">
            <label className="mb-2 block text-gray-700" htmlFor="group_link">
              Link do grupy (opcjonalne)
            </label>
            <input
              id="group_link"
              type="url"
              className="w-full rounded border border-gray-300 p-2"
              {...register("group_link")}
            />
          </div>
        )}

        {isOrganizer && (
          <div className="animate-fade-in mb-4">
            <label className="mb-2 block text-gray-700" htmlFor="facebook_link">
              Link do Facebooka (opcjonalne)
            </label>
            <input
              id="facebook_link"
              type="url"
              className="w-full rounded border border-gray-300 p-2"
              {...register("facebook_link")}
            />
          </div>
        )}

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="confirmPassword">
            Potwierdź hasło
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full rounded border p-2 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            {...register("confirmPassword", {
              required: "Proszę potwierdź hasło",
              validate: (value) =>
                value === watch("password") || "Hasła się nie zgadzają",
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

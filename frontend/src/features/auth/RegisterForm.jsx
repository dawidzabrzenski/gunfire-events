import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import InputField from "./../../components/form/InputField";

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
          <InputField
            type="checkbox"
            name="isOrganizer"
            register={register}
            onChange={() => setIsOrganizer((val) => !val)}
            className="size-4"
          />
          <p className="font-bold">Zarejestruj jako organizator</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <InputField
            label="Imię"
            name="first_name"
            type="text"
            register={register}
            required
            errors={errors}
          />
          <InputField
            label="Nazwisko"
            name="last_name"
            type="text"
            register={register}
            required
            errors={errors}
          />
        </div>

        <InputField
          label="Adres e-mail"
          name="email"
          type="email"
          register={register}
          required
          errors={errors}
          validation={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Niepoprawny format adresu e-mail",
            },
          }}
        />
        <InputField
          label="Nazwa użytkownika"
          name="username"
          type="text"
          register={register}
          required
          errors={errors}
          validation={{
            minLength: {
              value: 3,
              message: "Nazwa użytkownika musi mieć conajmniej 3 znaki",
            },
          }}
        />
        <InputField
          label="Numer telefonu (opcjonalne)"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
        />
        <InputField
          label="Województwo (opcjonalne)"
          name="voivodeship_id"
          type="select"
          register={register}
          errors={errors}
          defaultValue=""
          options={[
            { value: "", label: "-- Wybierz województwo --" },
            { value: "1", label: "Dolnośląskie" },
            { value: "2", label: "Kujawsko-Pomorskie" },
            { value: "3", label: "Lubelskie" },
            { value: "4", label: "Lubuskie" },
            { value: "5", label: "Łódzkie" },
            { value: "6", label: "Małopolskie" },
            { value: "7", label: "Mazowieckie" },
            { value: "8", label: "Opolskie" },
            { value: "9", label: "Podkarpackie" },
            { value: "10", label: "Podlaskie" },
            { value: "11", label: "Pomorskie" },
            { value: "12", label: "Śląskie" },
            { value: "13", label: "Świętokrzyskie" },
            { value: "14", label: "Warmińsko-Mazurskie" },
            { value: "15", label: "Wielkopolskie" },
            { value: "16", label: "Zachodniopomorskie" },
          ]}
        />
        {isOrganizer && (
          <InputField
            label="Link do grupy (opcjonalne)"
            name="group_link"
            type="url"
            register={register}
            errors={errors}
            className="animate-fade-in"
          />
        )}
        {isOrganizer && (
          <InputField
            label="Link do Facebooka (opcjonalne)"
            name="facebook_link"
            type="url"
            register={register}
            errors={errors}
            className="animate-fade-in"
          />
        )}
        <InputField
          label="Hasło"
          name="password"
          type="password"
          register={register}
          required
          errors={errors}
          validation={{
            minLength: {
              value: 6,
              message: "Hasło musi mieć conajmniej 6 znaków",
            },
          }}
        />
        <InputField
          label="Potwierdź hasło"
          name="confirmPassword"
          type="password"
          register={register}
          required
          errors={errors}
          validation={{
            validate: (value) =>
              value === watch("password") || "Hasła się nie zgadzają",
          }}
        />
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

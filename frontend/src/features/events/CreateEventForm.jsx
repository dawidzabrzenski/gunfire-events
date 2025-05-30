import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../categories/useCategories";
import { createEvent } from "../../features/events/eventApi";

import InputField from "../../components/form/InputField";
import Map from "../../components/Map/Map";
import VoivodeshipsOptions from "../../utils/VoivodeshipsOptions";

const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { user } = useAuth();
  const { categories, isCategoriesPending } = useCategories();

  const [address, setAddress] = useState({
    city: "",
    postal: "",
    street: "",
    voivodeship: null,
    latitude: null,
    longitude: null,
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category_id", data.category_id);
      formData.append("photo", data.photo[0]);
      formData.append("fee", data.fee);
      formData.append("city", data.city);
      formData.append("postal_code", data.postal);
      formData.append("street", data.street);
      formData.append("voivodeship_id", data.voivodeship_id);
      formData.append("date", data.date);
      formData.append("organizer_id", user.id);
      formData.append("latitude", address.latitude);
      formData.append("longitude", address.longitude);

      await createEvent(formData);
      reset();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Błąd podczas tworzenia wydarzenia",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-bg-surface border-border border-1 mx-auto max-w-2xl rounded-lg p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Dodaj wydarzenie</h2>

      {submitError && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Tytuł"
          name="title"
          register={register}
          errors={errors}
          required="Tytuł jest wymagany"
        />

        <InputField
          label="Opis"
          name="description"
          type="textarea"
          register={register}
          errors={errors}
          required="Opis jest wymagany"
        />

        {!isCategoriesPending && (
          <InputField
            label="Kategoria"
            name="category_id"
            type="select"
            register={register}
            errors={errors}
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
          />
        )}

        <InputField
          label="Opłata"
          name="fee"
          type="number"
          step="0.01"
          register={register}
          errors={errors}
          required="Opłata jest wymagana"
        />

        <div className="max-w-full overflow-hidden text-center">
          <Map handleSetAddress={setAddress} handleSetFormData={setValue} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Miasto"
            name="city"
            register={register}
            errors={errors}
            required="Miasto jest wymagane"
          />

          <InputField
            label="Kod pocztowy"
            name="postal"
            register={register}
            errors={errors}
            required="Kod pocztowy jest wymagany"
          />
        </div>

        <InputField
          label="Ulica"
          name="street"
          register={register}
          errors={errors}
          required="Ulica jest wymagana"
        />

        <InputField
          label="Województwo (opcjonalne)"
          name="voivodeship_id"
          type="select"
          register={register}
          errors={errors}
          defaultValue=""
        >
          <option className="" value="" disabled hidden>
            Wybierz województwo
          </option>
          <VoivodeshipsOptions />
        </InputField>

        <InputField
          label="Data"
          name="date"
          type="datetime-local"
          register={register}
          errors={errors}
          required="Data jest wymagana"
        />

        <InputField
          label="Zdjęcie"
          name="photo"
          type="file"
          accept="image/*"
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "Wysyłanie..." : "Dodaj wydarzenie"}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createEvent } from "../../features/events/eventApi";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      console.log(data);

      // const formData = new FormData();
      // formData.append("title", data.title);
      // formData.append("description", data.description);
      // formData.append("category_id", data.category_id);
      // formData.append("fee", data.fee);
      // formData.append("city", data.city);
      // formData.append("postal", data.postal);
      // formData.append("street", data.street);
      // formData.append("region", data.region);
      // formData.append("date", data.date);
      // formData.append("photo", data.photo[0]);

      // await createEvent(formData);
      reset();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Błąd podczas tworzenia wydarzenia",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold">Dodaj wydarzenie</h2>

      {submitError && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tytuł
          </label>
          <input
            type="text"
            className="w-full rounded border p-2"
            {...register("title", { required: "Tytuł jest wymagany" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Opis
          </label>
          <textarea
            className="w-full rounded border p-2"
            rows={4}
            {...register("description", { required: "Opis jest wymagany" })}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kategoria
          </label>
          <input
            type="number"
            className="w-full rounded border p-2"
            {...register("category_id", {
              required: "Kategoria jest wymagana",
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Opłata
          </label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded border p-2"
            {...register("fee", { required: "Opłata jest wymagana" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Miasto
            </label>
            <input
              type="text"
              className="w-full rounded border p-2"
              {...register("city", { required: "Miasto jest wymagane" })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kod pocztowy
            </label>
            <input
              type="text"
              className="w-full rounded border p-2"
              {...register("postal", {
                required: "Kod pocztowy jest wymagany",
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ulica
          </label>
          <input
            type="text"
            className="w-full rounded border p-2"
            {...register("street", { required: "Ulica jest wymagana" })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Region
          </label>
          <input
            type="text"
            className="w-full rounded border p-2"
            {...register("region", { required: "Region jest wymagany" })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="datetime-local"
            className="w-full rounded border p-2"
            {...register("date", { required: "Data jest wymagana" })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Zdjęcie
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            {...register("photo", { required: "Zdjęcie jest wymagane" })}
          />
          {errors.photo && (
            <p className="text-sm text-red-500">{errors.photo.message}</p>
          )}
        </div>

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

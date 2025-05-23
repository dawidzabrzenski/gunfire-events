import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";

const DropzoneField = ({ control, name, rules }) => {
  const { field, fieldState } = useController({ control, name, rules });

  const onDrop = (acceptedFiles) => {
    field.onChange(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Zdjęcie
      </label>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} `}
      >
        <input {...getInputProps()} />
        {field.value?.[0] ? (
          <p>{field.value[0].name}</p>
        ) : (
          <p>Przeciągnij plik tutaj lub kliknij, aby wybrać</p>
        )}
      </div>
      {fieldState.error && (
        <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  register,
  required,
  errors,
  options = [],
  children,
  rows,
  accept,
  className = "",
  validation = {},
  ...rest
}) => {
  const error = errors?.[name]?.message;

  const registerOptions = {
    ...validation,
    ...(required && { required: "To pole jest wymagane" }),
  };

  const sharedProps = {
    ...register(name, registerOptions),
    className: `w-full rounded border bg-bg-surface-input p-2 ${error ? "border-border-error " : "border-border-surface"} ${className}`,
    ...rest,
  };

  let inputElement;
  switch (type) {
    case "textarea":
      inputElement = <textarea rows={rows || 4} {...sharedProps} />;
      break;
    case "select":
      inputElement = (
        <select {...sharedProps}>
          {children
            ? children
            : options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
        </select>
      );
      break;
    case "checkbox":
      inputElement = <input type="checkbox" {...sharedProps} />;
      break;
    default:
      inputElement = <input type={type} accept={accept} {...sharedProps} />;
  }

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="text-text-muted mb-2 block">
          {label}
        </label>
      )}
      {inputElement}
      {error && (
        <p className="text-text-error bg-bg-error border-border-error border-1 mt-1 rounded-lg p-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;

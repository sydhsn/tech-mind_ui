import React from "react";

interface InputFieldProps {
  label?: string;
  name: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: "text" | "number" | "textarea";
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 bg-gray-700 text-white rounded ${
            disabled ? "opacity-50" : ""
          }`}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 bg-gray-700 text-white rounded ${
            disabled ? "opacity-50" : ""
          }`}
          disabled={disabled}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;

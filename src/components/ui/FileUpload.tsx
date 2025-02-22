import React from "react";

interface FileUploadProps {
  label?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  onChange,
  accept,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">{label}</label>
      )}
      <input
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        disabled={disabled}
        className="w-full p-2 bg-gray-700 text-white rounded"
      />
    </div>
  );
};

export default FileUpload;

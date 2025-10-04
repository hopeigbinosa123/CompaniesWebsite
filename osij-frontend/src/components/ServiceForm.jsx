import React, { useState, useEffect } from "react";

export default function ServiceForm({ fields, onSubmit, submitLabel, initialState, onFormChange, submitDisabled }) {
  const [formData, setFormData] = useState(initialState || fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {}));
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (initialState) {
      setFormData(initialState);
    }
  }, [initialState]);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    if (onFormChange) {
      onFormChange(newFormData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg("");
    try {
      await onSubmit(formData);
      setStatusMsg("✅ Submitted successfully! A confirmation email has been sent.");
      setFormData(initialState || fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {}));
    } catch (err) {
      setStatusMsg(`❌ Submission failed: ${err.message || "Please try again."}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
    <div key={field.name}>
    {field.type === "textarea" ? (
      <textarea
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required={field.required}
      />
    ) : field.type === "select" ? (
      <select
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required={field.required}
      >
        <option value="">{field.placeholder}</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required={field.required}
      />
    )}
  </div>  
      ))}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submitDisabled}
      >
        {submitLabel}
      </button>
      {statusMsg && <p className="mt-4">{statusMsg}</p>}
    </form>
  );
}
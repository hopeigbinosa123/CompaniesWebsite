import React, { useState } from "react";

export default function ServiceForm({ fields, onSubmit, submitLabel }) {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  
  const [formData, setFormData] = useState(initialState);
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
      .then(() => {
        setStatusMsg("✅ Submitted successfully! A confirmation email has been sent.");
        setFormData(initialState);
      })
      .catch(() => setStatusMsg("❌ Submission failed. Please try again."));
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
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {submitLabel}
      </button>
      {statusMsg && <p className="mt-4">{statusMsg}</p>}
    </form>
  );
}

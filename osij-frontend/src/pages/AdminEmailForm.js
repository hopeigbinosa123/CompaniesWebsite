import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminEmailForm = () => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch student list from backend
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students/");
        setStudents(response.data);
      } catch {
        setStatus("Failed to load students.");
      }
    };
    fetchStudents();
  }, []);

  const handleSend = async () => {
    if (!subject || !message || selected.length === 0) {
      setStatus("Please fill all fields and select recipients.");
      return;
    }

    try {
      await axios.post("/api/notifications/send/", {
        subject,
        message,
        recipients: selected
      });
      setStatus("✅ Emails sent successfully.");
      setSubject("");
      setMessage("");
      setSelected([]);
    } catch {
      setStatus("❌ Failed to send emails.");
    }
  };

  return (
    <div className="admin-email-form">
      <h2>📬 Send Email Notification</h2>

      <label>Select Recipients:</label>
      <select multiple value={selected} onChange={(e) => {
        const options = Array.from(e.target.selectedOptions).map(o => o.value);
        setSelected(options);
      }}>
        {students.map(s => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.email})
          </option>
        ))}
      </select>

      <label>Subject:</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Email subject"
      />

      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here"
      />

      <button onClick={handleSend}>Send Email</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminEmailForm;
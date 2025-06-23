import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreeting("");
    setError("");

    try {
      const response = await fetch("https://efarmogi-backend-2.onrender.com/greet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Σφάλμα απόκρισης: ${text}`);
      }

      const data = await response.json();
      setGreeting(data.message);
    } catch (err) {
      console.error("Σφάλμα κατά την υποβολή:", err);
      setError("Σφάλμα κατά την επικοινωνία με τον διακομιστή.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Πληκτρολόγησε το όνομά σου:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="π.χ. Μαρία"
          required
        />
        <button type="submit">Υποβολή</button>
      </form>

      {greeting && <h2>{greeting}</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </div>
  );
}

export default App;







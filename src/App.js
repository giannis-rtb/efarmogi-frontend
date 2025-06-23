import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreeting("");
    setError(false);

    try {
      const response = await fetch("https://efarmogi-backend.onrender.com/kalimera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Σφάλμα απόκρισης");
      }

      const data = await response.json();
      setGreeting(data.message);
    } catch (err) {
      console.error("Σφάλμα:", err);
      setError(true);
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
        />
        <button type="submit">Υποβολή</button>
      </form>

      {greeting && <h2>{greeting}</h2>}
      {error && (
        <h2 style={{ color: "red" }}>
          Σφάλμα κατά την επικοινωνία με τον διακομιστή.
        </h2>
      )}
    </div>
  );
}

export default App;





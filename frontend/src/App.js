import React, { useState } from "react";
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput("");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Wishlist</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Voeg een item toe"
        className="input-field"
      />
      <button onClick={addItem} className="add-button">
        Toevoegen
      </button>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

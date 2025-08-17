import { useState } from "react";

export default function MessageBoard() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { id: crypto.randomUUID(), text: "Hello all ! This is first message." },
  ]);

  const addMessage = () => {
    const text = draft.trim();
    if (!text) return; // ไม่เพิ่มถ้าว่าง
    setMessages((prev) => [{ id: crypto.randomUUID(), text }, ...prev]);
    setDraft("");
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") addMessage();
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Message board</h1>

      <div className="message-input-container">
        <input
          id="message-text"
          name="message-text"
          type="text"
          placeholder="Enter message here"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="submit-message-button" onClick={addMessage}>
          Submit
        </button>
      </div>

      <div className="board">
        {messages.map((m) => (
          <div key={m.id} className="message">
            <p className="message-text">{m.text}</p>
            <button
              className="delete-button"
              aria-label="Delete message"
              onClick={() => deleteMessage(m.id)}
              title="Delete"
            >
              ×
            </button>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="empty-hint">No messages yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}

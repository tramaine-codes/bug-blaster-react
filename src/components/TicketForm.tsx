import type React from "react";
import { useState } from "react";
import type { Ticket, TicketAction } from "../reducers/ticketReducer";

interface TicketFormProps {
  readonly dispatch: React.Dispatch<TicketAction>;
  readonly editingTicket?: Ticket;
}

export default function TicketForm({
  dispatch,
  editingTicket,
}: TicketFormProps) {
  const [title, setTitle] = useState(editingTicket?.title ?? "");
  const [description, setDescription] = useState(editingTicket?.description ?? "");
  const [priority, setPriority] = useState<"1" | "2" | "3">(editingTicket?.priority ?? "1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  } as const;

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: editingTicket ? "ticket:update" : "ticket:add",
      value: {
        id: editingTicket ? editingTicket.id : new Date().toISOString(),
        title,
        description,
        priority,
      },
    });

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          className="form-input"
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          className="form-input"
          onInput={(e) => setDescription(e.currentTarget.value)}
        />
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>

        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value as "1" | "2" | "3")}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <button type="submit" className="button">
        Submit
      </button>

      {editingTicket && (
        <button
          type="button"
          className="button"
          onClick={() => dispatch({ type: "ticket:editing:clear" })}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}

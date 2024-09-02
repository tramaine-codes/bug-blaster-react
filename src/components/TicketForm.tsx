import type React from "react";
import { useEffect, useState } from "react";
import type { Ticket, TicketAction } from "../reducers/ticketReducer";

interface TicketFormProps {
	readonly dispatch: React.Dispatch<TicketAction>;
	readonly editingTicket?: Ticket;
}

export default function TicketForm({
	dispatch,
	editingTicket,
}: TicketFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<"1" | "2" | "3">("1");

	useEffect(() => {
		if (editingTicket) {
			setTitle(editingTicket.title);
			setDescription(editingTicket.description);
			setPriority(editingTicket.priority);
		} else {
			clearForm();
		}
	}, [editingTicket]);

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
				<label>Title</label>
				<input
					type="text"
					value={title}
					className="form-input"
					onInput={(e) => setTitle(e.currentTarget.value)}
				/>
			</div>

			<div>
				<label>Description</label>
				<textarea
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

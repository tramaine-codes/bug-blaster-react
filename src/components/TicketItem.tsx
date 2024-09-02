import type { Ticket, TicketAction } from "../reducers/ticketReducer";

interface TicketItemProps {
	readonly ticket: Ticket;
	readonly dispatch: React.Dispatch<TicketAction>;
}

export default function TicketItem({ ticket, dispatch }: TicketItemProps) {
	const priorityClass = {
		1: "priority-low",
		2: "priority-medium",
		3: "priority-high",
	} as const;

	return (
		<div className="ticket-item">
			<div className={`priority-dot ${priorityClass[ticket.priority]}`} />

			<h3>{ticket.title}</h3>

			<p>{ticket.description}</p>

			<button
				type="button"
				className="button"
				onClick={() => dispatch({ type: "ticket:delete", value: ticket })}
			>
				Delete
			</button>

			<button
				type="button"
				className="button"
				onClick={() => dispatch({ type: "ticket:editing:set", value: ticket })}
			>
				Edit
			</button>
		</div>
	);
}

import type { Ticket, TicketAction } from "../reducers/ticketReducer";
import TicketItem from "./TicketItem";

interface TicketListProps {
  readonly tickets: ReadonlyArray<Ticket>;
  readonly dispatch: React.Dispatch<TicketAction>;
}

export default function TicketList({ tickets, dispatch }: TicketListProps) {
  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} dispatch={dispatch} />
      ))}
    </div>
  );
}

import type { Ticket, TicketState } from "../reducers/ticketReducer";

export const sortTickets = (
  tickets: ReadonlyArray<Ticket>,
  sortPreference: TicketState["sortPreference"],
) => {
  switch (sortPreference) {
    case "High to Low":
      return [...tickets].sort((x, y) => y.priority.localeCompare(x.priority));
    case "Low to High":
      return [...tickets].sort((x, y) => x.priority.localeCompare(y.priority));
    default:
      return tickets;
  }
};

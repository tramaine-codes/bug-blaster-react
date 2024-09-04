export interface Ticket {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly priority: "1" | "2" | "3";
}

export interface TicketState {
  readonly tickets: ReadonlyArray<Ticket>;
  readonly editingTicket?: Ticket;
  readonly sortPreference: "High to Low" | "Low to High";
}

export type TicketAction =
  | { type: "ticket:add"; value: Ticket }
  | { type: "ticket:delete"; value: Ticket }
  | { type: "ticket:update"; value: Ticket }
  | { type: "ticket:editing:set"; value: Ticket }
  | { type: "ticket:editing:clear" }
  | { type: "ticket:sorting:set"; value: TicketState["sortPreference"] };

export default function ticketReducer(
  state: TicketState,
  action: TicketAction,
): TicketState {
  switch (action.type) {
    case "ticket:add":
      return {
        ...state,
        tickets: [...state.tickets, action.value],
      };
    case "ticket:update":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.value.id ? action.value : ticket,
        ),
        editingTicket: undefined,
      };
    case "ticket:delete":
      // if (state.editingTicket && state.editingTicket.id === action.value.id) {
      if (state.editingTicket?.id === action.value.id) {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket.id !== action.value.id,
          ),
          editingTicket: undefined,
        };
      }

      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.id !== action.value.id,
        ),
      };
    case "ticket:editing:set":
      return {
        ...state,
        editingTicket: action.value,
      };
    case "ticket:editing:clear":
      return {
        ...state,
        editingTicket: undefined,
      };
    case "ticket:sorting:set":
      return {
        ...state,
        sortPreference: action.value,
      };
    default:
      return state;
  }
}

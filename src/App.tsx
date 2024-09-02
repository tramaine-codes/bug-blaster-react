import { useReducer } from "react";
import "./App.css";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import ticketReducer, { type TicketState } from "./reducers/ticketReducer";
import "./styles.css";
import { sortTickets } from "./utilities/sortUtilities";

export default function App() {
	const [state, dispatch] = useReducer(ticketReducer, {
		tickets: [],
		sortPreference: "High to Low",
	});
	const sortedTickets = sortTickets(state.tickets, state.sortPreference);

	return (
		<div className="App">
			<div className="container">
				<h1>Bug Blaster</h1>

				<TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />

				{state.tickets.length > 0 && (
					<div className="results">
						<h2>All Tickets</h2>

						<select
							value={state.sortPreference}
							onChange={(e) =>
								dispatch({
									type: "ticket:sorting:set",
									value: e.target.value as TicketState["sortPreference"],
								})
							}
						>
							<option value="High to Low">High to Low</option>
							<option value="Low to High">Low to High</option>
						</select>

						<TicketList tickets={sortedTickets} dispatch={dispatch} />
					</div>
				)}
			</div>
		</div>
	);
}

import "./Dropdown.css";

function Dropdown(props) {
	return (
		<div className="Dropdown space">
			<label for={props.name}>{props.heading}</label>
			<select name={props.name} onChange={props.handleChange} className="inp">
				<option value="" disabled selected>
					Select your option
				</option>
				{props.currencies.map((element) => {
					return (
						<option value={element.currency}>
							{element.name} - {element.currency}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default Dropdown;

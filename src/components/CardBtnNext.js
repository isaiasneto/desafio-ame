import React from 'react';
import {Button} from 'react-materialize'
import PlanetCard from './PlanetCard.js';

export default class CardBtnNext extends React.Component {
	render() {
		return (
			<div>
				<form onSubmit={PlanetCard.prototype.handleSubmit}>
					<Button waves="light">NEXT</Button>
				</form>
			</div>
		);
	}
}
import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import {Row, Col, Card, CardTitle, Button} from 'react-materialize';
import 'materialize-css/dist/js/materialize.min.js';
import axios from 'axios';

let allPlanets = [];

export default class PlanetCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			PlanetName: "None",
			PlanetImg: "planet.png",
			PlanetPopulation: "None",
			PlanetClimate: "None",
			PlanetTerrain: "None",
			PlanetFilms: ["None"]
		}

		// this.updateCard = this.updateCard
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		axios.get(`https://swapi.co/api/planets/?page=1`).then((resp) => {
			resp.data.results.forEach((item,index) => {
				allPlanets.push(item);
			});

			let itensq = parseInt(resp.data.count);
			let itensqa = resp.data.results.length;
			let pgnmax = Math.ceil(itensq / itensqa);

			for (var pgn = 2; pgn <= pgnmax; pgn++) {
				if (pgn === pgnmax) {
					axios.get(`https://swapi.co/api/planets/?page=${pgn}`).then((resp) => {
						resp.data.results.forEach((item,index) => {allPlanets.push(item)});
						const rdPlanet = allPlanets[Math.floor(Math.random()*allPlanets.length)];

						this.setState({
							PlanetName: rdPlanet.name,
							PlanetPopulation: rdPlanet.population,
							PlanetClimate: rdPlanet.climate,
							PlanetTerrain: rdPlanet.terrain,
						})

						let films = ["UNKNOWN"];
						if (rdPlanet.films.length > 0) {
							films = [];
							for (var i = 0; i < rdPlanet.films.length; i++) {
								axios.get(`${rdPlanet.films[i]}`).then((respfilm) => {
									films.push(respfilm.data.title);
									this.setState({PlanetFilms: films})
								});
							}
						} else {
							this.setState({PlanetFilms: films})
						}

						let imgurl = "planet.png";
						axios.get(`https://api.duckduckgo.com/?q=star wars ${rdPlanet.name}&format=json&no_redirect=1&atb=v148-1`).then((respimg) => {
							if (respimg.data.Image.length > 0) {imgurl = respimg.data.Image}
							this.setState({PlanetImg: imgurl})
						});
					});
				} else {
					axios.get(`https://swapi.co/api/planets/?page=${pgn}`).then((resp) => {
						resp.data.results.forEach((item,index) => {
							allPlanets.push(item);
						});
					});
				}
			}
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const rdPlanet = allPlanets[Math.floor(Math.random()*allPlanets.length)];

		this.setState({
			PlanetName: rdPlanet.name,
			PlanetPopulation: rdPlanet.population,
			PlanetClimate: rdPlanet.climate,
			PlanetTerrain: rdPlanet.terrain,
		})

		let films = ["UNKNOWN"];
		if (rdPlanet.films.length > 0) {
			films = [];
			for (var i = 0; i < rdPlanet.films.length; i++) {
				axios.get(`${rdPlanet.films[i]}`).then((respfilm) => {
					films.push(respfilm.data.title);
					this.setState({PlanetFilms: films})
				});
			}
		} else {
			this.setState({PlanetFilms: films})
		}

		let imgurl = "planet.png";
		axios.get(`https://api.duckduckgo.com/?q=star wars ${rdPlanet.name}&format=json&no_redirect=1&atb=v148-1`).then((respimg) => {
			if (respimg.data.Image.length > 0) {imgurl = respimg.data.Image}
			this.setState({PlanetImg: imgurl})
		}).catch(() => this.setState({PlanetImg: imgurl}));
	}

	render() {
		return (
			<Row>
				<Col s={12} m={6} l={4} offset="m3 l4">
					<Card
					header={<CardTitle children={<h4>{this.state.PlanetName.toUpperCase()}</h4>} image={this.state.PlanetImg} />}
					actions={[
						<form onSubmit={this.handleSubmit}>
							<Button waves="light">NEXT</Button>
						</form>
					]}
					children={
						<ul>
							<li key="1">
								<b>POPULATION:</b> {this.state.PlanetPopulation.toUpperCase()}
							</li>
							<li key="2">
								<b>CLIMATE:</b> {this.state.PlanetClimate.toUpperCase()}
							</li>
							<li key="3">
								<b>TERRAIN:</b> {this.state.PlanetTerrain.toUpperCase()}
							</li>
							<li key="4">
								<b>FEATURED IN:</b>
								<ul>
									{this.state.PlanetFilms.map((item,i) => <li style={{marginLeft: "20px"}} key={i}>{item.toUpperCase()}</li>)}
								</ul>
							</li>
						</ul>
					}>
					</Card>
				</Col>
			</Row>
		);
	}
}

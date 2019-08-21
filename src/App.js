import React from 'react';
import './App.css';
import WeatherInfoComponent from'./WeatherInfoComponent';

const fetch = require("node-fetch");
const API_KEY = 'b3a1fe31fb871a134c029733070442ae';

class App extends React.Component {
	state = {
		city : undefined,
		temperature: undefined,
		humidity: undefined,
		pressure: undefined,
		wind: undefined,
		cloudiness: undefined
	}
	
	getWeather = () =>
	{
		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=${API_KEY}`)
			.then(response => response.json())
			.then(data => {
				this.setState({
					city:data.name,
					temperature: data.main.temp,
					humidity:data.main.humidity,
					pressure:data.main.pressure,
					wind:data.wind,
					cloudiness:data.weather[0].description,
				})
			}
		)
	}
	
	handleChanges = (event) =>
	{
		this.setState({city:event.target.value})
	}
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<label for="city">City</label>
					<input id={"City"}
							type='text'
							value={this.state.city}
							onChange={this.handleChanges}/>
					<input type="button"
							onClick={this.getWeather}
							value={'Get Weather'}/>
				</header>
				
				<div className="App-content">
					<WeatherInfoComponent 
						city={this.state.city}
						temperature={this.state.temperature}
						humidity={this.state.humidity}
						pressure={this.state.pressure}
						wind={this.state.wind}
						cloudiness={this.state.cloudiness}/>
				</div>
			</div>
		)
	}
}

export default App

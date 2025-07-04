import React from 'react'


function getWeatherIcon(wmoCode) {
    const icons = new Map([
        [[0], "☀️"],
        [[1], "🌤"],
        [[2], "⛅️"],
        [[3], "☁️"],
        [[45, 48], "🌫"],
        [[51, 56, 61, 66, 80], "🌦"],
        [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
        [[71, 73, 75, 77, 85, 86], "🌨"],
        [[95], "🌩"],
        [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
}


function convertToFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {weekday: "short"})
        .format(new Date(dateStr));
}


class App extends React.Component {

    state = {
        location: '',
        isLoading: false,
        displayLocation: '',
        weather: {}
    }

    fetchWeather = async () => {
        try {
            this.setState({ isLoading: true })

            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`);
            const geoData = await geoRes.json();

            if (!geoData.results) throw new Error("Location not found");

            const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);

            this.setState({displayLocation: `${name} ${convertToFlag(country_code)}`});

            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`);
            const weatherData = await weatherRes.json();

            this.setState({ weather: weatherData.daily})
        }
        catch (err) {
            console.error(err);
        }
        finally {
            this.setState({ isLoading: false })
        }
    }

    handleInput = (value) => {
        this.setState(() => {
            return {location: value}
        })
    }

    componentDidMount() {
        this.setState({location: localStorage.getItem('location') || ''})

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.location.length < 2) return

        if (this.state.location !== prevState.location) {
            this.fetchWeather();
        }

        localStorage.setItem('location', this.state.location)
    }

    render() {

        return (
            <div className="app">
                <h1>Classy Weather</h1>
                <Input onInputChange={this.handleInput} location={this.state.location}/>
                {this.state.isLoading && <p className="loader">Loading...</p>}
                {this.state.weather.weathercode &&
                    <Weather weather={this.state.weather} location={this.state.displayLocation}/>
                }
            </div>
        )
    }
}


class Input extends React.Component {

    render() {

        const {onInputChange, location} = this.props

        return (
            <div>
                <input
                    type="text"
                    placeholder="search for location..."
                    value={location}
                    onChange={(e) => onInputChange(e.target.value)}
                />
            </div>
        )
    }
}


export default App;


class Weather extends React.Component {

    componentWillUnmount() {
        console.log('disappear')
    }

    render() {

        const {
            temperature_2m_max: max,
            temperature_2m_min: min,
            weathercode: codes,
            time: dates
        } = this.props.weather


        return (
            <div>
                <h2>Weather {this.props.location}</h2>
                <ul className="weather">
                    {dates.map((date, i) =>
                        <Day
                        date={date}
                        max={max.at(i)}
                        min={min.at(i)}
                        code={codes.at(i)}
                        key={date}
                        isToday={i === 0}
                        />
                    )}
                </ul>
            </div>
        )
    }
}


class Day extends React.Component {

    render() {

        const {date, min, max, code, isToday} = this.props

        return (
            <li className='day'>
                <span>{getWeatherIcon(code)}</span>
                <p>{isToday ? 'Today' : formatDay(date)}</p>
                <p>{Math.floor(min)}&deg; &mdash; {Math.ceil(max)}&deg;</p>
            </li>
        )
    }
}

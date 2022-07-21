import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

export default class App extends Component {
	// apiKey= process.env.REACT_APP_NEWS_API    // Not working
	state={
		progress:0
	}
	setProgress=(progress)=>{
		this.setState({progress:progress});
	}
	apiKey= 'c117423dc62e4fb2a8a00ba3b24e726f';
	render() {
		return (
			<>
				<Router>
					<Navbar />
					<LoadingBar
						color='#f11946'
						height={3}
						progress={this.state.progress}
					/>
					<Routes>
						<Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} country='in' category='general' />} />
						<Route exact path='/bussiness' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={5} country='in' category='business' />} />
						<Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={5} country='in' category='entertainment' />} />
						<Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={5} country='in' category='sports' />} />
						<Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} country='in' category='science' />} />
						<Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={5} country='in' category='health' />} />
						<Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={5} country='in' category='technology' />} />
					</Routes>
				</Router>
			</>
		)
	}
}


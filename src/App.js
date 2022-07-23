import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

export default function App() {
	// apiKey= process.env.REACT_APP_NEWS_API    // Not working
	const [progress, setProgress] = useState(0);
	const SetProgress = (newProgress) => {
		setProgress(newProgress);
	}
	const apiKey = 'c117423dc62e4fb2a8a00ba3b24e726f';
	return (
		<>
			<Router>
				<Navbar />
				<LoadingBar
					color='#f11946'
					height={3}
					progress={progress}
				/>
				<Routes>
					<Route exact path='/' element={<News setProgress={SetProgress} apiKey={apiKey} key="general" pageSize={5} country='in' category='general' />} />
					<Route exact path='/bussiness' element={<News setProgress={SetProgress} apiKey={apiKey} key="business" pageSize={5} country='in' category='business' />} />
					<Route exact path='/entertainment' element={<News setProgress={SetProgress} apiKey={apiKey} key="entertainment" pageSize={5} country='in' category='entertainment' />} />
					<Route exact path='/sports' element={<News setProgress={SetProgress} apiKey={apiKey} key="sports" pageSize={5} country='in' category='sports' />} />
					<Route exact path='/science' element={<News setProgress={SetProgress} apiKey={apiKey} key="science" pageSize={5} country='in' category='science' />} />
					<Route exact path='/health' element={<News setProgress={SetProgress} apiKey={apiKey} key="health" pageSize={5} country='in' category='health' />} />
					<Route exact path='/technology' element={<News setProgress={SetProgress} apiKey={apiKey} key="technology" pageSize={5} country='in' category='technology' />} />
				</Routes>
			</Router>
		</>
	)
}


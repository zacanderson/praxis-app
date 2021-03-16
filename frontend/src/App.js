import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/Dashboard';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<LoginPage />
				</Route>
				<Route path="/Dashboard" exact>
					<LoggedInPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

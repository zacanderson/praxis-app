import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/Dashboard';
import ResetPassPage from './pages/ResetPass';
import PassResetPage from './pages/PasswordReset';

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
				<Route path="/SendReset" exact>
					<ResetPassPage />
				</Route>
				<Route path="/ResetPassword" exact>
					<PassResetPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

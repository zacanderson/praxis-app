import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import LoggedInPage from './pages/Dashboard';
import ResetPassPage from './pages/ResetPass';
import PassResetPage from './pages/PasswordReset';
import RegisterPage from './pages/RegisterPage';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalendarPage from './pages/CalendarPage'
import HeaderLogo from './components/HeaderLogo'
import HabitsPage from './pages/HabitsPage'
import StatsPage from './pages/StatsPage'
import ResendPage from './pages/ResendPage'







function App() {
 
 
	// const styles = {
	// 	header: {
	// 		backgroundImage: `url("https://images.unsplash.com/photo-1554189097-ffe88e998a2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80")`,
	// 		height: '100vh',
	// 		backgroundPosition: 'center',
	// 		backgroundRepeat: 'repeat-x',
	// 		backgroundSize: 'cover'
	// 	},
  
	// 	content: {
	// 		height: '100%',
	// 		width: '100%',
	// 		backgroundColor: 'rgba(255,255,255, 0.8)',
	// 	}
	// }
  
  
  
	return (
		<div >
		<div >
		<HeaderLogo />
		<Router>
			<Switch>
				<Route path="/" exact>
					<LoginPage />
				</Route>
				<Route path="/Stats" exact>
					<StatsPage />
				</Route>
				<Route path="/Habits" exact>
					<HabitsPage />
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
				<Route path="/Register" exact>
					<RegisterPage />
				</Route>
				<Route path="/Calendar" exact>
					<CalendarPage />
				</Route>
				<Route path="/Resend" exact>
					<ResendPage />
				</Route>
			</Switch>
		</Router>
		</div>
		</div>
	);
 }
 

export default App;

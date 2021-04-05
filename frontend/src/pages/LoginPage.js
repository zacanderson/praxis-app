import React from 'react';

import Login from '../components/LoginUI';
import HeaderLogo from '../components/HeaderLogo';
import HabitList from '../components/HabitsList'
import Habit from '../components/Habit'




const LoginPage = () => {
	return (
		<div>
			<HeaderLogo />
			<Login  />
			<HabitList />

		</div>

	);
};

export default LoginPage;
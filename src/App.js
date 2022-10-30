
import React from 'react';
import HeaderWrap from './Component/Layout/HeaderWrap';
import { Route, Routes, Switch } from 'react-router-dom';
import Login from './Component/Login';
import Leads from './Containers/Leads';
import MilkBuilder from './Containers/MilkBuilder';
import { LoginContext } from './Context/LoginContext';

function App() {

	const [user, setUser] = React.useState({
		name: '',
		address: '',
	});
	const [isLogged, setIsLogged] = React.useState(false);

	return (
		<div className="App">
			<LoginContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>

				<Routes>
					<Route path="/leads" element={<Leads />}></Route>
					<Route path="/milkbuilder" exact element={<MilkBuilder />}></Route>
				</Routes>
			</LoginContext.Provider>
		</div>
	);
}

export default App;

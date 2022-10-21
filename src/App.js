
import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

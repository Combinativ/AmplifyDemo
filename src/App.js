import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
	HashRouter as Router,
	Route,
	Switch,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Alerts from "./components/layout/Alerts";
import Dashboard from "./components/contents/Dashboard";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";

import { Provider as AlertProvider } from "react-alert"; // Alert provider
import AlertTemplate from "react-alert-template-basic"; //put alert template here
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authAction";

//Alert Options
const alertOptions = {
	timeout: 3000,
	position: "bottom center",
};
class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Provider store={store}>
				{/* Provider for react-alert package */}
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<div style={{ backgroundColor: '#000', color: '#eeee', minHeight: '1000px' }}>
							<Header />
							<Alerts />
								<Switch>
									<PrivateRoute exact path="/" component={Dashboard} />
									<Route exact path="/login" component={Login} />
									<Route exact path="/register" component={Register} />
								</Switch>
						</div>
					</Router>
				</AlertProvider>
			</Provider>
		);
	}
}
export default App;
// ReactDOM.render(<App />, document.getElementById("combinativ_app"));

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ReactRouter, {Router, Route, Navigation, History} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
);

ReactDOM.render(routes, document.querySelector('#main'));











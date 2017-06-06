import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from  'redux';
import { Match,routing,historyMiddleware } from 'redux-router-middleware';
import { createHistory } from 'history';
import { Provider } from 'react-redux';

import LeftColumn from './components/LeftColumn';
import Menu from './components/Menu';
import RightColumn  from './components/RightColumn';
import TicketList  from './components/TicketList';
import Popup  from './components/Popup';
import style from './css/app.css';
import defaultProps from './defaultProps';

var urls = [
	{
		name: "root",
		pattern: "/app"
	},
	{
		name: "popup",
		pattern: "/app/popup"
	},{
		name: "ticketlist",
		pattern: "/app/ticketlist"
	}
]

var history = createHistory();
var middleware = applyMiddleware(historyMiddleware(history));
var store = createStore(combineReducers({routing: routing(urls)}), {}, middleware);

class App extends React.Component{
	render(){
		let { menus, ticketDetails } = this.props;
		return <Match name="root">
				<div className={style.parent}>
					<LeftColumn menus={menus}/>
					<RightColumn>
						<Match name="popup" isExactly={true}>
							<Popup/>
						</Match>
						<Match name="ticketlist" isExactly={true}>
							<TicketList ticketDetails={ticketDetails}/>
						</Match>
					</RightColumn>
				</div>
			</Match>
	}
}

App.defaultProps = defaultProps;

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>, output
);
import React from 'react';
import style from '../css/app.css';

export default class LeftColumn extends React.Component{
	render(){
		return <div className={style.leftColumn}>
			<div className={style.parent}>
				<a href="/app/ticketlist">
					<div className={style.menu}>{this.props.menus[0]}</div>
				</a>
				<a href="/app/popup">
					<div className={style.menu}>{this.props.menus[1]}</div>
				</a>
				</div>
			</div>
	}
}
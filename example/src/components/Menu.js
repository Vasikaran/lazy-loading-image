import React from 'react';
import style from '../css/app.css';

export default class Menu extends React.Component{
	render(){
		return <div className={style.parent}>
			{
				this.props.menus.map((menu, id)=>{
					return <a href="/root">
						<div className={style.menu} key={id}>{menu}</div>
					</a>
				})
			}
		</div>
	}
}
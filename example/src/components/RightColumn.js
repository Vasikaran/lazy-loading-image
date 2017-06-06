import React from 'react';
import style from '../css/app.css';
import Scroll from './Scroll';

export default class RightColumn extends React.Component{
	render(){
		return <Scroll className={style.rightColumn}>
			{
				this.props.children
			}
		</Scroll>
	}
}
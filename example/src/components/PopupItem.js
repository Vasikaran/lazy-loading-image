import React from 'react';
import LazyLoadingImage from './LazyLoadingImage';
import style from '../css/app.css';

export default class PopupItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isViewPopup: false
		};
	}

	render(){
		return <div className={style.popupitem}>
			<span>{this.props.agent.name}</span>
			<LazyLoadingImage loadingSrc={"https://www.wallies.com/filebin/images/loading_apple.gif"} src={this.props.agent.pic}/>
		</div>
	}
}
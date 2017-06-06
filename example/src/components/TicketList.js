import React from 'react';
import Scroll from './Scroll';
import LazyLoadingImage from './LazyLoadingImage';
import style from '../css/app.css';

export default class TicketList extends React.Component{
	render(){
		return <div>
			{
				this.props.ticketDetails.map((ticket, id)=>{
						return <div key={id} className={style.tickets}>
							<div className={style.ticketListLeft}>
								<div>
									<span>{ticket.title}</span>
									<span>{ticket.id}</span>
								</div>
								<div>
									<span>{ticket.status}</span>
									<span>{ticket.content}</span>
								</div>
							</div>
							<div className={style.ticketListRight}>
								<span>{ticket.ticketOwner.name}</span>
								<LazyLoadingImage loadingSrc={"https://www.wallies.com/filebin/images/loading_apple.gif"} src={ticket.ticketOwner.pic}/>
							</div>
						</div>
					})
			}
		</div>
	}
}
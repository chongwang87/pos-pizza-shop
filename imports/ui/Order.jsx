import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Orders from '../api/orders';

class Order extends Component {
	render() {
		const orders = this.props.orders.map(
			order => this.makeOrder(order)
		);

		return (
			<div>
				<h2>Orders</h2>
				<ul>{ orders }</ul>
			</div>
		);
	}

	makeOrder(order) {
		return (
			<li key={ order._id }>
				<a href={ order.url } target="_blank">{ order.title }</a>
			</li>
		)
	}
}

export default withTracker(() => {
	return {
		orders: Orders.find().fetch(),
	};
})(Order);

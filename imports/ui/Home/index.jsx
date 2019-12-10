import React, { Component } from 'react'

import Dashboard from '../_component/Dashboard'
import OrderHistory from '../_component/OrderHistory'

export default function Home() {
	return (
		<>
			<Dashboard />
			<OrderHistory />
		</>
	)
}
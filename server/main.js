import { Meteor } from 'meteor/meteor'

import Menus from '../imports/api/menus'
import Orders from '../imports/api/orders'

function insertOrder(data) {
	Orders.insert({
		createdAt : new Date(), ...data
	})
}
function insertMenu(data) {
	Menus.insert({
		createdAt : new Date(), ...data
	})
}

Meteor.startup(() => {
	// inject some data if collection is empty
	if (Orders.find().count() === 0) {}
	if (Menus.find().count() === 0) {
		[
			{
				type : 'flavour', name : 'BBQ Chicken', price : 1.40
			},
			{
				type : 'flavour', name : 'BBQ Chunky Chic', price : 1.20
			},
			{
				type : 'flavour', name : 'Cheese \'N\' Chic', price : 1.20
			},
			{
				type : 'flavour', name : 'Chic Ham \'N\' Shroom', price : 1.20
			},
			{
				type : 'flavour', name : 'Chicken Supreme', price : 1.00
			},
			{
				type : 'flavour', name : 'Curry Chicken', price : 1.00
			},
			{
				type : 'flavour', name : 'Hawaiian Supreme', price : 1.40
			},
			{
				type : 'flavour', name : 'Hawaiian', price : 1.00
			},
			{
				type : 'flavour', name : 'Knotty Cheesy Ham', price : 1.60
			},
			{
				type : 'flavour', name : 'Knotty Cheesy Hawaiian with a Twist', price : 1.60
			},
			{
				type : 'flavour', name : 'Ocean Delight', price : 1.20
			},
			{
				type : 'flavour', name : 'Pepperoni', price : 1.00
			},
			{
				type : 'flavour', name : 'Seafood Deluxe', price : 1.40
			},
			{
				type : 'flavour', name : 'Simply Cheese', price : 1.20
			},
			{
				type : 'flavour', name : 'Super Supreme', price : 1.00
			},
			{
				type : 'flavour', name : 'The Four Cheese', price : 1.40
			},
			{
				type : 'flavour', name : 'Veggie Lover\'s', price : 1.00
			},
			{
				type : 'flavour', name : 'Very Beefy', price : 1.20
			},
			{
				type : 'flavour', name : 'Wild About Mushrooms', price : 1.40
			},
			{
				type : 'addon', name : 'Bacon', price : 2.0
			},
			{
				type : 'addon', name : 'Beef', price : 2.0
			},
			{
				type : 'addon', name : 'Black olives', price : 1.0
			},
			{
				type : 'addon', name : 'Chicken', price : 2.0
			},
			{
				type : 'addon', name : 'Extra cheese', price : 1.0
			},
			{
				type : 'addon', name : 'Fish', price : 2.0
			},
			{
				type : 'addon', name : 'Green peppers', price : 1.0
			},
			{
				type : 'addon', name : 'Mushrooms', price : 1.0
			},
			{
				type : 'addon', name : 'Onions', price : 1.0
			},
			{
				type : 'addon', name : 'Pepperoni', price : 1.5
			},
			{
				type : 'addon', name : 'Pineapple', price : 1.5
			},
			{
				type : 'addon', name : 'Sausage', price : 1.5
			},
			{
				type : 'addon', name : 'Spinach', price : 1.0
			},
			{
				type : 'crust', name : 'Beer Battered', price : 2
			},
			{
				type : 'crust', name : 'Boneless', price : 2
			},
			{
				type : 'crust', name : 'Chicago Style Pan', price : 2
			},
			{
				type : 'crust', name : 'Coast to Coast', price : 2
			},
			{
				type : 'crust', name : 'Cracker Crust', price : 2
			},
			{
				type : 'crust', name : 'Deep Dish', price : 2
			},
			{
				type : 'crust', name : 'Flat Bread', price : 1
			},
			{
				type : 'crust', name : 'Focaccia', price : 2
			},
			{
				type : 'crust', name : 'Greek', price : 2
			},
			{
				type : 'crust', name : 'Neopolitan', price : 2
			},
			{
				type : 'crust', name : 'New York', price : 2
			},
			{
				type : 'crust', name : 'Pretzel', price : 2
			},
			{
				type : 'crust', name : 'Sicilian', price : 2
			},
			{
				type : 'crust', name : 'Sour Dough', price : 2
			},
			{
				type : 'crust', name : 'St. Louis', price : 2
			},
			{
				type : 'crust', name : 'Stuffed Dough', price : 2
			},
			{
				type : 'crust', name : 'Thin Crust', price : 1
			},
			{
				type : 'crust', name : 'Tomato Pie', price : 2
			},
			{
				type : 'crust', name : 'Traditional Pan', price : 1
			},
			{
				type : 'size', name : 'Extra-large (18\')', price : 20
			},
			{
				type : 'size', name : 'Large (14\')', price : 15
			},
			{
				type : 'size', name : 'Medium (12\')', price : 9
			},
			{
				type : 'size', name : 'Small (8\')', price : 5
			}
		].forEach(doc => {
			insertMenu(doc)
		})
	}
})

Meteor.publish('orders', function() {
	return Orders.find()
})
Meteor.publish('menus', function() {
	return Menus.find()
})

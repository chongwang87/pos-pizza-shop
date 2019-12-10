import { Meteor } from 'meteor/meteor';

import Menus from '../imports/api/menus';
import Orders from '../imports/api/orders';

function insertOrder(data) {
  Orders.insert({ createdAt: new Date(), ...data });
}
function insertMenu(data){
  Menus.insert({ createdAt : new Date(), ...data})
}

Meteor.startup(() => {
  // inject some data if collection is empty
  if (Orders.find().count() === 0) {}
  if (Menus.find().count() === 0) {
    [
      { type: "flavour", name: 'Hawaiian', price: 1.00 },
      { type: "flavour", name: 'Chicken Supreme', price: 1.00 },
      { type: "flavour", name: 'Super Supreme', price: 1.00 },
      { type: "flavour", name: 'Pepperoni', price: 1.00 },
      { type: "flavour", name: 'Veggie Lover\'s', price: 1.00 },
      { type: "flavour", name: 'Curry Chicken', price: 1.00 },
      { type: "flavour", name: 'BBQ Chunky Chic', price: 1.00 },
      { type: "flavour", name: 'Chic Ham \'N\' Shroom', price: 1.00 },
      { type: "flavour", name: 'Cheese \'N\' Chic', price: 1.00 },
      { type: "flavour", name: 'Simply Cheese', price: 1.00 },
      { type: "flavour", name: 'Ocean Delight', price: 1.00 },
      { type: "flavour", name: 'Very Beefy', price: 1.00 },
      { type: "flavour", name: 'Wild About Mushrooms', price: 1.00 },
      { type: "flavour", name: 'BBQ Chicken', price: 1.00 },
      { type: "flavour", name: 'The Four Cheese', price: 1.00 },
      { type: "flavour", name: 'Seafood Deluxe', price: 1.00 },
      { type: "flavour", name: 'Hawaiian Supreme', price: 1.00 },
      { type: 'crust', name: 'Chicago Style Pan', price: 2 },
      { type: 'crust', name: 'New York', price: 2 },
      { type: 'crust', name: 'Flat Bread', price: 2 },
      { type: 'crust', name: 'Deep Dish', price: 2 },
      { type: 'crust', name: 'Pretzel', price: 2 },
      { type: 'crust', name: 'Stuffed Dough', price: 2 },
      { type: 'crust', name: 'Coast to Coast', price: 2 },
      { type: 'crust', name: 'Boneless', price: 2 },
      { type: 'crust', name: 'Cracker Crust', price: 2 },
      { type: 'crust', name: 'Sour Dough', price: 2 },
      { type: 'crust', name: 'Beer Battered', price: 2 },
      { type: 'crust', name: 'Greek', price: 2 },
      { type: 'crust', name: 'Thin Crust', price: 2 },
      { type: 'crust', name: 'Sour Dough', price: 2 },
      { type: 'crust', name: 'Neopolitan', price: 2 },
      { type: 'crust', name: 'Traditional Pan', price: 2 },
      { type: 'crust', name: 'Sicilian', price: 2 },
      { type: 'crust', name: 'Focaccia', price: 2 },
      { type: 'crust', name: 'St. Louis', price: 2 },
      { type: 'crust', name: 'Tomato Pie', price: 2 },
      { type: 'size', name: 'Small (8\')', price: 5 },
      { type: 'size', name: 'Medium (12\')', price: 9 },
      { type: 'size', name: 'Large (14\')', price: 15 },
      { type: 'size', name: 'Extra-large (18\')', price: 20 },
      { type: 'addon', name: 'Mushroom', price: 0.2 },
      { type: 'addon', name: 'Chicken', price: 0.1 },
      { type: 'addon', name: 'Beef', price: 0.1 },
      { type: 'addon', name: 'Fish', price: 0.1 },
      { type: 'addon', name: 'Pepperoni', price: 0.1 },
      { type: 'addon', name: 'Mushrooms', price: 0.1 },
      { type: 'addon', name: 'Onions', price: 0.1 },
      { type: 'addon', name: 'Sausage', price: 0.1 },
      { type: 'addon', name: 'Bacon', price: 0.1 },
      { type: 'addon', name: 'Extra cheese', price: 0.1 },
      { type: 'addon', name: 'Black olives', price: 0.1 },
      { type: 'addon', name: 'Green peppers', price: 0.1 },
      { type: 'addon', name: 'Pineapple', price: 0.1 },
      { type: 'addon', name: 'Spinach', price: 0.1 }
    ].forEach(doc => {
      insertMenu(doc)
    })
  }
});

import { Meteor } from 'meteor/meteor';

import Orders from '../imports/api/orders';

function insertOrder(title, url) {
  Orders.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Orders collection is empty, add some data.
  if (Orders.find().count() === 0) {
    // insertOrder(
    //   'Do the Tutorial',
    //   'https://www.meteor.com/tutorials/react/creating-an-app'
    // );

    // insertOrder(
    //   'Follow the Guide',
    //   'http://guide.meteor.com'
    // );

    // insertOrder(
    //   'Read the Docs',
    //   'https://docs.meteor.com'
    // );

    // insertOrder(
    //   'Discussions',
    //   'https://forums.meteor.com'
    // );
  }
});

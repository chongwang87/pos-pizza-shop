import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export default Menus = new Mongo.Collection('menus')

if (Meteor.isServer){
	Meteor.startup(() => {
		Menus._ensureIndex({ type: 1 })
		Menus._ensureIndex({ name: 1 }, { unique: true })
	})
}
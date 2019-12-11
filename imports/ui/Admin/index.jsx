import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Menus from '../../api/menus'

import Dashboard from '../_component/Dashboard'

const useStyles = makeStyles(theme => ({
	introduction : { margin : theme.spacing(2, 0) },
	tabs : {
		backgroundColor : theme.palette.background.paper,
		margin : theme.spacing(2, 0)
	}
}))

function Admin(props) {
	const classes = useStyles(),
		[value, setValue] = useState('flavour'),
		[state, setState] = useState({
			columns : [
				{
					title : 'Name', field : 'name'
				},
				{
					title : 'Value', field : 'price', type : 'numeric'
				}
			],
			data : props.menus(value)
		}),

	 handleChange = (event, newValue) => {
			setValue(newValue)
			setState(state => {
				return {
					...state, data : props.menus(newValue)
				}
			})
		}

	useEffect(() => {
		setState(state => {
			return {
				...state, data : props.menus(value)
			}
		})
	}, [props.ready])

	return (
		<>
			<Dashboard />
			<Typography className={ classes.introduction } variant="body1">
				Customise your menus.
				Pizza price = Flavor x Crust x (Size ($) + Addons ($))
			</Typography>
			<div className={ classes.tabs }>
				<AppBar position="static">
					<Tabs
						value={ value }
						onChange={ handleChange }
					>
						<Tab label="Flavour" value="flavour" />
						<Tab label="Size" value="size" />
						<Tab label="Crust" value="crust" />
						<Tab label="Addon" value="addon" />
					</Tabs>
				</AppBar>
				<MaterialTable
					isLoading={ !props.ready }
					title={ value.toLocaleString() }
					columns={ state.columns }
					data={ state.data }
					options={
						{
							pageSize : 20,
							actionsColumnIndex : 2
						}
					}
					editable={ {
						onRowAdd : newData =>
							new Promise(resolve => {
								newData.type = value
								resolve()
								Menus.insert({
									...newData,
									createdAt : new Date()
								})
								setState(prevState => {
									return {
										...prevState, data : props.menus(value)
									}
								})
							}),
						onRowUpdate : (newData, oldData) =>
							new Promise(resolve => {
								resolve()
								if (oldData) {
									Menus.update({ _id : oldData._id }, { $set : newData })
									setState(prevState => {
										return {
											...prevState, data : props.menus(value)
										}
									})
								}
							}),
						onRowDelete : oldData =>
							new Promise(resolve => {
								resolve()
								Menus.remove({ _id : oldData._id })
								setState(prevState => {
									return {
										...prevState, data : props.menus(value)
									}
								})
							})
					} }
				/>
			</div>
		</>
	)
}

export default withTracker(() => {
	let subs = Meteor.subscribe('menus')

	return {
		ready : subs.ready(),
		menus : (type = 'flavor') => {
			return Menus.find({ type : type }).fetch()
		}
	}
})(Admin)
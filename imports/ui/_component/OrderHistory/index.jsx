import React from 'react'
import moment from 'moment'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import Orders from '../../../api/orders'

const columns = [
		{
			id : 'date',
			label : 'Date',
			format : v => moment(v).format('LLL')
		},
		{
			id : 'flavour',
			label : 'Flavour',
			format : v => v.toLocaleString()
		},
		{
			id : 'size',
			label : 'Size',
			align : 'right'
		},
		{
			id : 'crust',
			label : 'Crust',
			format : v => v.toLocaleString()
		},
		{
			id : 'addon',
			label : 'Addon',
			format : v => v.map((e, i) => {
				return `${ (i > 0) ? ',' : '' } ${ e.name.toLocaleString() }`
			})
		},
		{
			id : 'price',
			label : 'Price',
			align : 'right',
			format : v => `$${ v }`
		}
	],
	useStyles = makeStyles(theme => ({
		root : { width : '100%' },
		title : {
			flex : '1 1 100%',
			margin : theme.spacing(2, 0)
		},
		tableWrapper : {
			maxHeight : 600,
			overflow : 'auto'
		},
		tableCellWrap : { whiteSpace : 'wrap' },
		tableCell : { whiteSpace : 'nowrap' }
	}))

function OrderHistory() {
	const classes = useStyles(),
		[page, setPage] = React.useState(0),
		[rowsPerPage, setRowsPerPage] = React.useState(50),
		orders = Orders.find({}, { sort : { createdAt : -1 } }).fetch(),
		handleChangePage = (event, newPage) => {
			setPage(newPage)
		},
		handleChangeRowsPerPage = event => {
			setRowsPerPage(+event.target.value)
			setPage(0)
		}

	return (
		<>
			<Typography
				className={ classes.title }
				variant="h4"
			>
				Orders
			</Typography>
			<Paper className={ classes.root }>
				<div className={ classes.tableWrapper }>
					<Table
						stickyHeader
						size="small"
					>
						<TableHead>
							<TableRow>
								{ columns.map(column => (
									<TableCell
										key={ column.id }
										align={ column.align }
										style={ { minWidth : column.minWidth } }
										width={ column.id == 'flavour' || column.id == 'addon' ? '50%' : '' }
									>
										{ column.label }
									</TableCell>
								)) }
							</TableRow>
						</TableHead>
						<TableBody>
							{ orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doc => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={ -1 }
										key={ doc._id }
									>
										{ columns.map(column => {
											let value

											switch (column.id) {
												case 'date':
													value = doc.createdAt
													break
												case 'flavour':
													value = doc.recipe.flavour.name
													break
												case 'size':
													value = doc.recipe.size.name
													break
												case 'crust':
													value = doc.recipe.crust.name
													break
												case 'addon':
													value = doc.recipe.addon
													break
												case 'price':
													value = doc.totalPrice
													break
											}
											return (
												<TableCell
													key={ column.id }
													align={ column.align }
													component={ column.id == 'flavour' ? 'th' : 'td' }
													className={ column.id == 'addon' ? classes.tableCellWrap : classes.tableCell }
												>
													{ column.format ? column.format(value) : value }
												</TableCell>
											)
										}) }
									</TableRow>
								)
							}) }
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={ [10, 25, 50, 100] }
					component="div"
					count={ orders.length }
					rowsPerPage={ rowsPerPage }
					page={ page }
					onChangePage={ handleChangePage }
					onChangeRowsPerPage={ handleChangeRowsPerPage }
				/>
			</Paper>
		</>
	)
}

export default withTracker(() => {
	let subs = Meteor.subscribe('orders')

	return {
		ready : subs.ready(),
		orders : Orders.find().fetch()
	}
})(OrderHistory)

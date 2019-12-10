import React, { Component } from 'react'

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
		id: 'flavour',
		label: 'Flavour',
		format: v => v.toLocaleString()
	}, {
		id: 'size',
		label: 'Size',
		align: 'right'
	}, {
		id: 'crust',
		label: 'Crust',
		format: v => v.toLocaleString(),
	}, {
		id: 'additional',
		label: 'Additional',
		format: v => v.map((e, i) => {
			return `${ (i > 0) ? ',' : '' } ${ e.toLocaleString() }`
		}),
	}, {
		id: 'price',
		label: 'Price',
		align: 'right',
		format: v => v.toFixed(2),
	},
]

function createData(id, flavour, size, crust, additional, price) {
	return { id, flavour, size, crust, additional, price }
}

const rows = [
	createData(1, 'Hawaiian', 14, 'Pan', ['mushroom','cheese'], 18.90),
	createData(2, 'Chicken Supreme', 14, 'Pan', ['mushroom'], 18.90),
	createData(3, 'Super Supreme', 7, 'Pan', ['mushroom'], 18.90),
	createData(4, 'Pepperoni', 14, 'Pan', ['mushroom'], 18.90),
	createData(5, 'Veggie Lover\'s', 12, 'Pan', ['mushroom'], 18.90),
	createData(6, 'Curry Chicken', 7, 'Pan', ['mushroom'], 18.90),
	createData(7, 'BBQ Chunky Chic', 12, 'Pan', ['mushroom'], 18.90),
	createData(8, 'Chic Ham \'N\' Shroom',7, 'Pan', ['mushroom'], 18.90),
	createData(9, 'Cheese \'N\' Chic', 12, 'Pan', ['mushroom'], 18.90),
	createData(10, 'Simply Cheese', 12, 'Pan', ['mushroom'], 18.90),
	createData(11, 'Ocean Delight', 7, 'Pan', ['mushroom'], 18.90),
	createData(12, 'Very Beefy', 12, 'Pan', ['mushroom'], 18.90),
	createData(13, 'Wild About Mushrooms', 12, 'Pan', ['mushroom'], 18.90),
	createData(14, 'BBQ Chicken', 7, 'Pan', ['mushroom'], 18.90),
	createData(15, 'The Four Cheese', 12, 'Pan', ['mushroom'], 18.90),
	createData(16, 'Seafood Deluxe', 7, 'Pan', ['mushroom'], 18.90),
	createData(17, 'Hawaiian Supreme', 12, 'Pan', ['mushroom'], 18.90),
]

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	title: {
		flex: '1 1 100%',
		margin: theme.spacing(2, 0)
	},
	tableWrapper: {
		maxHeight: 600,
		overflow: 'auto',
	},
	tableCell:{
		whiteSpace : 'nowrap'
	}
}))

function Order() {
	const classes = useStyles()
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(50)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
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
										style={ { minWidth: column.minWidth } }
									>
										{ column.label }
									</TableCell>
								)) }
							</TableRow>
						</TableHead>
						<TableBody>
							{ rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={ -1 }
										key={ row.id }
									>
										{ columns.map(column => {
											const value = row[column.id]
											return (
												<TableCell
													key={ column.id }
													align={ column.align }
													component={ column.id == 'flavour' ? 'th' : 'td' }
													width={ column.id == 'flavour' ? '100%' : '' }
													className={ classes.tableCell }
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
					count={ rows.length }
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
	return {
		orders: Orders.find().fetch(),
	}
})(Order)

import React, { Component } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import PlusIcon from '@material-ui/icons/Add'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
	root: {
		color: theme.palette.primary
	},
	title: {
		margin: theme.spacing(2, 0)
	},
	inline: {
		display: 'inline-block'
	},
	button: {},
	modal : {
		position: 'absolute',
		top: theme.spacing(2),
		left: '50%',
		transform: 'translate(-50%, 0)',
		width: '80%',
		maxWidth: 800,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	}
}))

export default function Dashboard() {
	const classes = useStyles(),
		[open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Grid container spacing={ 2 }>
			<Grid item xs={ 12 }>
				<Typography
					className={ classes.title }
					variant="h2"
				>
					Welcome to { ' ' }
					<Box color="primary.main" fontWeight={ 600 } className={ classes.inline }>Popular Pizza</Box>!
        		</Typography>
				{ useRouteMatch("/admin") ?
					<Button
						variant="contained"
						className={ classes.button }
						startIcon={ <ArrowBackIcon /> }
						size="small"
						component={ Link }
						to="/"
					>
						Back
          		</Button>
					:
					<>
						<ButtonGroup variant="contained">
							<Button
								variant="contained"
								color="primary"
								className={ classes.button }
								startIcon={ <PlusIcon /> }
								size="large"
								onClick={ handleOpen }
							>
								New Order
							</Button>
							<Button
								variant="contained"
								className={ classes.button }
								startIcon={ <SupervisorAccountIcon /> }
								size="large"
								component={ Link }
								to="/admin"
							>
								Admin
							</Button>
						</ButtonGroup>
						<Modal
							open={ open }
							onClose={ handleClose }
						>
							<div className={ classes.modal }>
								<h2>Text in a modal</h2>
								<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
							</div>
						</Modal>
					</>
				}
			</Grid>
		</Grid>
	)
}

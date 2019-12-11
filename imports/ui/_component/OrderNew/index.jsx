import _ from 'underscore'
import { Random } from 'meteor/random'
import React, { useState, useEffect } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { useSnackbar } from 'notistack'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Menus from '../../../api/menus'
import Orders from '../../../api/orders'

function getSteps() {
	return ['Flavour', 'Size', 'Crust', 'Addon']
}

const ExpansionPanel = withStyles({
		root : {
			border : '1px solid rgba(0, 0, 0, .125)',
			boxShadow : 'none',
			'&:not(:last-child)' : { borderBottom : 0 },
			'&:before' : { display : 'none' },
			'&$expanded' : { margin : 'auto' }
		},
		expanded : {}
	})(MuiExpansionPanel),
	ExpansionPanelSummary = withStyles({
		root : {
			backgroundColor : 'rgba(0, 0, 0, .03)',
			borderBottom : '1px solid rgba(0, 0, 0, .125)',
			marginBottom : -1,
			minHeight : 56,
			'&$expanded' : { minHeight : 56 }
		},
		content : { '&$expanded' : { margin : '12px 0' } },
		expanded : {}
	})(MuiExpansionPanelSummary),
	ExpansionPanelDetails = withStyles(theme => ({ root : { padding : theme.spacing(2) } }))(MuiExpansionPanelDetails),
	useStyles = makeStyles(theme => ({
		heading : {
			fontSize : theme.typography.pxToRem(15),
			flexBasis : '10%',
			flexShrink : 0,
			fontWeight : 600
		},
		subHeading : {
			fontSize : theme.typography.pxToRem(15),
			color : theme.palette.primary.main,
			textAlign : 'right',
			fontWeight : 600,
			flexBasis : '90%',
			flexShrink : 0
		},
		menuItem : { padding : theme.spacing(2) },
		addon : { display : 'inline-block' },
		final : { padding : theme.spacing(2) },
		total : {
			textAlign : 'right',
			fontWeight : 600
		}
	}))

function OrderNew(props) {
	const { enqueueSnackbar } = useSnackbar(),
		classes = useStyles(),
		[activeStep, setActiveStep] = useState(0),
		[completed, setCompleted] = useState({}),
		[order, setOrder] = useState({
			_id : null,
			recipe : {
				flavour : null,
				size : null,
				crust : null,
				addon : []
			},
			totalPrice : 0,
			createdAt : null
		}),
		[state, setState] = useState({
			flavour : props.menus('flavour'),
			size : props.menus('size'),
			crust : props.menus('crust'),
			addon : props.menus('addon'),
			orders : []
		}),
		steps = getSteps(),
		totalSteps = () => {
			return steps.length - 1
		},
		completedSteps = () => {
			return Object.keys(completed).length
		},
		allStepsCompleted = () => {
			return completedSteps() === totalSteps()
		},
		getTotalPrice = () => {
			let flavour = order.recipe.flavour && order.recipe.flavour.price ? order.recipe.flavour.price.toFixed(2) : 1,
				size = order.recipe.size && order.recipe.size.price ? order.recipe.size.price.toFixed(2) : 0,
				crust = order.recipe.crust && order.recipe.crust.price ? order.recipe.crust.price.toFixed(2) : 1,
				addon = order.recipe.addon && order.recipe.addon.length > 0 ? _.pluck(order.recipe.addon, 'price').reduce((a, b) => a + b, 0).toFixed(2) : 0

			setOrder(order => {
				return {
					...order,
					totalPrice : (flavour * crust * (((size * 100) + (addon * 100)) / 100)).toFixed(2)
				}
			 })
		},
		handleStep = step => () => {
			setActiveStep(step)
		},
		handleChange = (step) => (event, currentStep) => {
			setActiveStep(step)
		},
		handleNext = () => {
			const nextStep =
				!allStepsCompleted()
					? steps.findIndex((step, i) => !(i in completed))
					: totalSteps()

			setActiveStep(nextStep)
		},
		handleReset = () => {
			setActiveStep(0)
			setCompleted({})
			setOrder(order => {
				return {
					...order,
					recipe : {
						flavour : null,
						size : null,
						crust : null,
						addon : []
					},
					totalPrice : 0
				}
			})
		},
		handleComplete = () => {
			const newCompleted = completed

			newCompleted[ activeStep ] = true
			setCompleted(newCompleted)
			handleNext()
		},
		handleClick = (doc, step) => () => {
			if (doc.type !== 'addon') {
				setActiveStep(step)
				setOrder(order => {
					return {
						...order,
						recipe : {
							...order.recipe,
							[ doc.type ] : _.pick(doc, ['_id', 'name', 'price'])
						}
					}
				})
				handleComplete()
			} else {
				let addons = _.flatten(_.compact([...order.recipe.addon, _.pick(doc, ['_id', 'name', 'price'])]))

				setOrder(order => {
					return {
						...order,
						recipe : {
							...order.recipe,
							[ doc.type ] : addons
						}
					}
				})
			}
		},
		handlePlaceOrder = () => () => {
			if (totalSteps() == completedSteps()) {
				Orders.insert({
					...order,
					_id : Random.id(),
					createdAt : new Date()
				})
				enqueueSnackbar('Order Submitted', { variant : 'success' })
				props.onClose()
			} else {
				handleNext()
			}
		}

	useEffect(() => {
		getTotalPrice()
	}, [order.recipe])
	useEffect(() => {
		setState(state => {
			return {
				...state,
				flavour : props.menus('flavour'),
				size : props.menus('size'),
				crust : props.menus('crust'),
				addon : props.menus('addon')
			}
		})
	}, [props.ready])

	return (
		<div>
			<Stepper nonLinear activeStep={ activeStep } alternativeLabel>
				{ steps.map((e, i) => (
					<Step key={ e }>
						<StepButton onClick={ handleStep(i) } completed={ completed[ i ] }>
							<StepLabel>{ e }</StepLabel>
						</StepButton>
					</Step>
				)) }
			</Stepper>
			<ExpansionPanel square expanded={ activeStep === 0 } onChange={ handleChange(0) }>
				<ExpansionPanelSummary>
					<Typography className={ classes.heading }>Flavour</Typography>
					{ order.recipe.flavour && order.recipe.flavour._id &&
						<Typography className={ classes.subHeading }>{ order.recipe.flavour.name }</Typography>
					}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={ 2 }>
						{ props.ready && state.flavour && state.flavour.length > 0 &&
							state.flavour.map((e) => {
								return <Grid key={ e._id } item xs={ 3 }>
									<ButtonGroup fullWidth>
										<Button
											className={ classes.menuItem }
											onClick={ handleClick(e, 0) }
											disabled={ order.recipe.flavour && order.recipe.flavour._id && order.recipe.flavour._id == e._id }
										>{ e.name }</Button>
									</ButtonGroup>
								</Grid>
							})
						}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel square expanded={ activeStep === 1 } onChange={ handleChange(1) }>
				<ExpansionPanelSummary>
					<Typography className={ classes.heading }>Size</Typography>
					{ order.recipe.size && order.recipe.size._id &&
						<Typography className={ classes.subHeading }>{ order.recipe.size.name }</Typography>
					}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={ 2 }>
						{ props.ready && state.size && state.size.length > 0 ?
							state.size.map((e) => {
								return <Grid key={ e._id } item xs={ 3 }>
									<ButtonGroup fullWidth>
										<Button
											className={ classes.menuItem }
											onClick={ handleClick(e, 1) }
											disabled={ order.recipe.size && order.recipe.size._id && order.recipe.size._id == e._id }
										>{ e.name }</Button>
									</ButtonGroup>
								</Grid>
							})
							:
							<CircularProgress />
						}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel square expanded={ activeStep === 2 } onChange={ handleChange(2) }>
				<ExpansionPanelSummary>
					<Typography className={ classes.heading }>Crust</Typography>
					{ order.recipe.crust && order.recipe.crust._id &&
						<Typography className={ classes.subHeading }>{ order.recipe.crust.name }</Typography>
					}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={ 2 }>
						{ props.ready && state.crust && state.crust.length > 0 &&
							state.crust.map((e) => {
								return <Grid key={ e._id } item xs={ 3 }>
									<ButtonGroup fullWidth>
										<Button
											className={ classes.menuItem }
											onClick={ handleClick(e, 2) }
											disabled={ order.recipe.crust && order.recipe.crust._id && order.recipe.crust._id == e._id }
										>{ e.name }</Button>
									</ButtonGroup>
								</Grid>
							})
						}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel square expanded={ activeStep === 3 } onChange={ handleChange(3) }>
				<ExpansionPanelSummary>
					<Typography className={ classes.heading }>Addons</Typography>
					{ order.recipe.addon.length > 0 &&
						<Typography className={ classes.subHeading }>
							{ order.recipe.addon.map((e, i) => {
								return <span key={ e._id } className={ classes.addon }>
									{ `${ i > 0 ? ', ' : '' }${ e.name }` }
								</span>
							}) }
						</Typography>
					}
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={ 2 }>
						{ props.ready && state.addon && state.addon.length > 0 &&
							state.addon.map((e) => {
								return <Grid key={ e._id } item xs={ 3 }>
									<ButtonGroup fullWidth>
										<Button
											className={ classes.menuItem }
											onClick={ handleClick(e, 3) }
											disabled={ order.recipe.addon.length > 0 && !!_.findWhere(order.recipe.addon, { _id : e._id }) }
										>{ e.name }</Button>
									</ButtonGroup>
								</Grid>
							})
						}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<Grid container className={ classes.final }>
				<Grid item xs={ 8 }>
					<ButtonGroup>
						<Button variant="contained" color="primary" size="large" onClick={ handlePlaceOrder() }>Place Order</Button>
						<Button variant="contained" size="large" onClick={ props.onClose }>Cancel</Button>
						<Button variant="contained" size="large" onClick={ handleReset }>Reset</Button>
					</ButtonGroup>
				</Grid>
				<Grid item xs={ 4 }>
					<Typography variant="h4" className={ classes.total }>
						Total : ${ order.totalPrice ? order.totalPrice : 0 }
					</Typography>
				</Grid>
			</Grid>
		</div>
	)
}

export default withTracker((props) => {
	let subs = Meteor.subscribe('menus')

	return {
		ready : subs.ready(),
		menus : (type = 'flavor') => {
			return Menus.find({ type : type }).fetch()
		}
	}
})(OrderNew)
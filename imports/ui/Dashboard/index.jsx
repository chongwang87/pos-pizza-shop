import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import PlusIcon from '@material-ui/icons/Add'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles(theme => ({
  title: {
    margin : theme.spacing(2, 0)
  },
  button: {},
}))

export default function Dashboard() {
  const classes = useStyles()

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 }>
        <Typography
          className={ classes.title }
          variant="h2"
        >
          Welcome to Popular Pizza!
        </Typography>
        <ButtonGroup variant="contained">
          <Button
            variant="contained"
            color="primary"
            className={ classes.button }
            startIcon={ <PlusIcon /> }
            size="large"
          >
            New Order
          </Button>
          <Button
            variant="contained"
            className={ classes.button }
            startIcon={ <SupervisorAccountIcon /> }
            size="large"
          >
            Admin
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

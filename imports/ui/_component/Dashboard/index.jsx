import React, { Component } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import PlusIcon from '@material-ui/icons/Add'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root : {
    color: theme.palette.primary
  },
  title: {
    margin : theme.spacing(2, 0)
  },
  inline : {
    display : 'inline-block'
  },
  button: {},
}))

export default function Dashboard() {
  const classes = useStyles(),
    history = useHistory()

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
        <ButtonGroup variant="contained">
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
                    component={ Link }
                    to="/admin"
                  >
                    Admin
              </Button>
            </>
          }
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

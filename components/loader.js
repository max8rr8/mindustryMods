import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { getModData } from '../logic/loadData';
import { fixStr } from '../logic/fix';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 7
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export function Loader({ load, component }) {
  let classes = useStyles()

  let [status, setStatus] = useState({
    loaded: false,
    data: null
  });

  useEffect(() => {
    if(status.loaded) return;
    load().then(data =>
      setStatus({
        loaded: true,
        data
      })
    );
  });

  return !status.loaded ? (
    <Grid container spacing={0} direction='column' alignItems='center' justify='center'>
      <Grid item xs={3}>
        <CircularProgress className={classes.progress} />
      </Grid>
    </Grid>
  ) : (
    component(status.data)
  );
}

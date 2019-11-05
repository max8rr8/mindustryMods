import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, CircularProgress } from '@material-ui/core';
import { getModReadme } from '../logic/loadData';
import Markdown from './markdown';
import { Loader } from './loader';

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

export function Readme({ mod }) {
  const classes = useStyles();
  const [modContent, setModContent] = useState('');

  useEffect(() => {
    getModReadme(mod).then(e => {
      setModContent(e);
    });
  });

  return (
    <Card className={classes.card}>
      <Loader
        load={() => getModReadme(mod)}
        component={() => (
          <CardContent>
            <Markdown>{modContent}</Markdown>
          </CardContent>
        )}
      />
    </Card>
  );
}

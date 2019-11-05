import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { Loader } from './loader';
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

export function Mod({ mod, showLearnMore = true, showDownloadButton = true }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Loader
        load={() => getModData(mod)}
        component={data => (
          <React.Fragment>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom />
              <Typography variant='h5' component='h2'>
                {fixStr(data.author)}/{fixStr(data.name)}
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                v{data.version}
              </Typography>
              <Typography variant='body2' component='p'>
                {fixStr(data.description)
                  .split('\n')
                  .map((item, i) => (
                    <span key={i}>
                      {item}
                      <br />
                    </span>
                  ))}
              </Typography>
            </CardContent>
            <CardActions>
              {showLearnMore ? (
                <Link to={'/mod/' + mod} style={{ textDecoration: 'none' }}>
                  <Button size='small'>Learn More</Button>
                </Link>
              ) : null}

              {showDownloadButton ? (
                <a
                  href={'https://api.github.com/repos/' + mod + '/zipball/master'}
                  style={{ textDecoration: 'none' }}
                >
                  <Button size='small'>Download</Button>
                </a>
              ) : null}
            </CardActions>
          </React.Fragment>
        )}
      />
    </Card>
  );
}

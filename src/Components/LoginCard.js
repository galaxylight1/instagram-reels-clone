import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 310,
    position: 'absolute',
    top: '6.2rem',
    left: '47rem',
    padding: '9px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  field: {
      marginLeft: '2.5rem',
      marginTop: '0.5rem',
  },
  btn: {
      marginLeft: '6.2rem',
      marginTop: '2rem',
  },
  logo: {
      marginLeft: '4.9rem',
      marginBottom: '0.5rem',
  },
  fileUpload: {
      marginLeft: '3.5rem',
      marginTop: '1.5rem',
  },
  errorMsg: {
    fontSize: '10.5px',
    color: 'red',
    marginLeft: '6.90rem',
    marginTop: '0.5rem',
    width: '4.5rem',
    height: '0.5rem',
  }
});

export default function LoginCard({ name, password, login, error }) {

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <img className={classes.logo} src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
        
        <TextField className={classes.field} id="standard-basic" label="Username" onChange={(e) => name(e.target.value)}/>
        <TextField className={classes.field} id="standard-basic" label="Password" type="password" onChange={(e) => password(e.target.value)}/>

      </CardContent>
        { error ? <div className={classes.errorMsg}>{error}</div> : <><div className={classes.errorMsg}></div></> }
      <CardActions>
        <Button className={classes.btn} variant="outlined" color="primary" onClick={login}>Login</Button>
      </CardActions>
    </Card>
  );
}


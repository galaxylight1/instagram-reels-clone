import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

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
  loginBtn: {
      marginLeft: '3.4rem',
      marginTop: '2rem',
  },
  signUpBtn: {
    marginLeft: '8.5rem',
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

export default function LoginCard({ email, password, login, error }) {

  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <img className={classes.logo} src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
        
        <TextField className={classes.field} id="standard-basic" label="Email" onChange={(e) => email(e.target.value)}/>
        <TextField className={classes.field} id="standard-basic" label="Password" type="password" onChange={(e) => password(e.target.value)}/>

      </CardContent>
        { error ? <div className={classes.errorMsg}>{error}</div> : <><div className={classes.errorMsg}></div></> }
      <CardActions>
        <Button className={classes.loginBtn} variant="outlined" color="primary" onClick={login}>Login</Button>
        <Button className={classes.signUpBtn} variant="contained" color="secondary" onClick={() => history.push('/signup')}>Sign Up</Button>
      </CardActions>
    </Card>
  );
}


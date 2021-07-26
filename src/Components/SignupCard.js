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
      marginLeft: '5.7rem',
      marginTop: '2rem',
  },
  logo: {
      marginLeft: '4.9rem',
      marginBottom: '0.5rem',
  },
  fileUpload: {
      marginLeft: '3.5rem',
      marginTop: '1.5rem',
  }
});

export default function SignupCard({ name, email, password, file, signup }) {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <img className={classes.logo} src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
        
        <TextField className={classes.field} id="standard-basic" label="Username" onChange={(e) => name(e.target.value)}/>
        <TextField className={classes.field} id="standard-basic" label="Email" onChange={(e) => email(e.target.value)}/>
        <TextField className={classes.field} id="standard-basic" label="Password" type="password" onChange={(e) => password(e.target.value)}/>
        
        <Button className={classes.fileUpload} variant="contained" color="primary" component="label" >
        Profile Photo
        <input type="file" accept="image/*" hidden onChange={file} />
        </Button>

      </CardContent>
      <CardActions>
        <Button className={classes.btn} variant="outlined" color="primary" onClick={signup}>Sign Up</Button>
      </CardActions>
    </Card>
  );
}


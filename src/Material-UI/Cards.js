import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import style from './Cards.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Avatar from '@material-ui/core/Avatar';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ReactDOM from 'react-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Comments from './Comments';

const useStyles = makeStyles({
  root: {
    marginLeft: '28.3rem',
    marginTop: '5vh',
    marginBottom: '20vh',
    width: '30%',
    height: '30%',
  },
  media: {
    width: '100%',
  },
  label: {
    position: 'absolute',
    left: '1rem',
    bottom: '1.85rem',
  },
  actionLabel: {
    position: 'absolute',
    right: '0.1rem',
    bottom: '1.9rem',
  },
  dialog: {
    display: 'flex',
  },
  dialogContainer: {
    height: '73vh',
    width: '52vw',
  },
});

export default function Cards({ source, post, name, avatar}) {
  const classes = useStyles();
  const [openId, setOpenId] = React.useState(null);
  const vidRef = useRef(null);

  const handleMute = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }

  const handleAutoScroll = (e) => {
    let next = e.target.parentElement.parentElement.parentElement.nextSibling; // Note: referred DOM Tree for this
 
    if(next != null)
    {
      next.scrollIntoView({behavior: 'smooth'}); // smooth scrolling to next reel
      e.target.muted = true;
    }
  }

  const handleClickOpen = (id) => {
    setOpenId(id);
    vidRef.current.pause();
  };
  const handleClose = () => {
    setOpenId(null);
    vidRef.current.play();
  };

  return (
    <Card className={classes.root}>

      <CardActionArea>

        <video ref={vidRef} onEnded={handleAutoScroll} className={style.vs} src={source} muted onClick={handleMute} />

        <div className={classes.label} style={{display: 'flex', borderBottom: '1px gray', alignItems: 'center'}}>
          <Avatar src={avatar} style={{width: '30px', height: '30px'}}/>
          <div style={{marginLeft: '1rem', color: 'white', fontSize: '14px'}}>{name}</div>
        </div>

        <div className={classes.actionLabel}>
          <Button size="small" color="primary">
            <FavoriteBorderIcon style={{color: 'white', opacity: '0.7', zIndex: '3'}} />
          </Button>
          <Button size="small" color="primary">
            <ChatBubbleOutlineIcon style={{color: 'white', opacity: '0.7', zIndex: '3'}} onClick={() => handleClickOpen(post.pId)}/>
          </Button>

            <Dialog
            open={openId === post.pId}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
              <div className={classes.dialog}>
                <div className={classes.dialogContainer}>
                  <video className={style.vsDialog} autoPlay loop src={post.pUrl} />
                </div>
                <Comments postData={post} name={name} avatar={avatar}/>
              </div>
              
          </Dialog>
        </div>

      </CardActionArea>

    </Card>
  );
}

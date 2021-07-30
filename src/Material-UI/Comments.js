import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { database } from '../firebase';
import { CircularProgress } from '@material-ui/core';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        
    },
    box: {
        height: '73vh',
        width: '60vw',
        padding: '12px',    
    },
    textField: {
        position: 'absolute',
        top: '24rem',
        left: '18rem',
        width: '35%',
    },
    btn: {
        position: 'absolute',
        top: '25rem',
        left: '32rem',
    },
    progress: {
        marginLeft: '8rem',
        marginTop: '2rem',
    },
    commentDiv: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '25px',
        height: '25px',
    },
});

function Comments({ postData, name, avatar }) {
    const classes = useStyles();
    const [text, setText] = useState('');
    const [comments, setComments] = useState(null);

    const manageText = (e) => {
        let comment = e.target.value;
        setText(comment);
    }

    const handleOnEnter = () => {
        let obj = {
            text: text,
            uName: name,
            uUrl: avatar,
        }

        // Add comment to comments collection and add it to comments array in posts collection
        database.comments.add(obj).then(docRef => {
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments, docRef.id]
            });
        })
        .catch(e => {
            console.log(e);
        })

        setText('');
    }
    
    useEffect(async () => {
        let arr = []; // populate this array
        for(let i=0; i<postData.comments.length; i++)
        {
            let cid = postData.comments[i];
            let data = await database.comments.doc(cid).get();
            arr.push(data.data());
        }

        setComments(arr);
    }, [postData]);

    return (
        <div className={classes.box}>
            <div className={classes.commentsSection}>
                {
                    comments == null ? <CircularProgress className={classes.progress} /> :
                    comments.map((comment, index) => (
                        <div key={index} className={classes.commentDiv}>
                            <Avatar className={classes.avatar} src={comment.uUrl} />
                            <p style={{fontSize: '13px'}}><span style={{marginLeft: '6%', fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                        </div>
                    ))
                }
            </div>
            <TextField fullWidth={true} label='Leave a comment' onChange={manageText} className={classes.textField} />
            <Button onClick={handleOnEnter} disabled={text==''?true:false} className ={classes.btn} color='primary'>Post</Button>
        </div>
    );
}

export default Comments;

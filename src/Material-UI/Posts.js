import React, { useState, useEffect, useContext } from 'react';
import { database } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Cards from './Cards';
import { AuthContext } from '../Context/AuthProvider';

const useStyles = makeStyles({
    root: {

    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '47%',
    }
});

function Posts({ userData = null }) {
    const classes = useStyles();
    const [posts, setPosts] = useState(null); // initially we don't have posts, we will get it from collection
    const { currentUser } = useContext(AuthContext); 
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAvatar, setCurrentUserAvatar] = useState(null);

    // callback for our Intersection Observer API
    const callback = (entries) => {
        entries.forEach((element) => {

            let el = element.target.children[0].children[0].children[0];

            if(element.isIntersecting == true)
            {
                el.play();
            }
            else el.pause();
        });
    }

    const observer = new IntersectionObserver(callback, { threshold: 0.85 }); 

    // useEffect Hook 2nd Variation
    useEffect(async () => {
        let parr = [];
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => { // snapshot to detect real-time changes
            parr = []; // to avoid duplicate entries
            querySnapshot.forEach((doc) => {
                let data = {...doc.data(), postId: doc.id};
                parr.push(data);
            });
            setPosts(parr);
        });

        let userData = await database.users.doc(currentUser.uid).get();
        let obj = userData.data();
        setCurrentUserName(obj.username);
        setCurrentUserAvatar(obj.profileUrl);

        return unsub; // cleanup listener
    }, []);

    // we can have multiple useEffects
    useEffect(() => {

        // here, we attach the Intersection Observer 
        let elements = document.querySelectorAll('.video');
        elements.forEach((el) => {
            observer.observe(el);
        });

        // cleanup, good practice to remove existing listeners
        return () => {
            observer.disconnect();
        }
    }, [posts]);

    return (
        // JSX code
        <>
            { 
                posts == null ? <CircularProgress className={classes.loader} color='secondary' /> : 
                <div className='video-container' id='video-container'>
                    {
                        posts.map((post, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className='video'>
                                        <Cards source={post.pUrl} post={post} name={post.uName} avatar={post.uProfile} currentUserName={currentUserName} currentUserAvatar={currentUserAvatar} />
                                    </div>
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            }
        </>
    );
}

export default Posts;
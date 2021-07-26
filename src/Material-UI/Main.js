import React, {useContext, useEffect, useState} from 'react';
import Navbar from './Navbar';
import Cards from './Cards';
import { AuthContext } from '../Context/AuthProvider';
import { database } from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile.js';
import { makeStyles } from '@material-ui/core/styles';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Posts from './Posts';

const useStyles = makeStyles(() => ({
    root: {
    },

    progress: {
        marginLeft: '47%',
        marginTop: '15%',
    },
}));

function Main() {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });

    }, [currentUser]);

    return (
        <>
            { userData == null ? <CircularProgress className={classes.progress}/> : 
            <>            

            <Navbar userData={userData} />

            <div className="example">
                {/* <PerfectScrollbar component="div"> */}
                    <div className='feed-container'>
                        <UploadFile userData={userData} />
                        <Posts userData={userData} />
                        {/* <Cards />
                        <Cards /> */}
                    </div>
                {/* </PerfectScrollbar> */}
            </div>

            </>
            }
        </>
    )
}

export default Main; 
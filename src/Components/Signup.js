import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';
import SignupCard from './SignupCard';
import style from './Login.module.css';
import { useHistory } from 'react-router-dom';

let slideIdx = 0;

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [timer, setTimer] = useState(null);
    const history = useHistory();

    const { signup } = useContext(AuthContext);

    const handleSignup = async (e) => {
        e.preventDefault(); // disable reloading of page upon submitting form

        try
        {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;

            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);

            // fn1 -> progress tracking, 'state_changed' observer, called any time stae changes
            // fn2 -> error, Error observer, called on failure
            // fn3 -> success, Completion observer, called on successful completion
            
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);

            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('');
                }, 2000);
                setLoading(false);
            }

            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({ // this is async work
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: [],
                });

                history.push('/');
            }

            setLoading(false);
        }
        catch(err)
        {
            setError(err);
            setTimeout(() => setError(''), 2000);
            setLoading(false);
            console.log(err);
        }
    }

    const handleFileSubmit = (e) => {
        let file = e.target.files[0];

        console.log(file);

        if(file != null)
        {
            setFile(file);
        }
    }

    const carousel = () => {
        let slides = document.getElementsByClassName('mySlides');

        for(let i = 0; i < slides.length; i++)
        {
            slides[i].style.display = 'none';
            slides[i].classList.remove(style.enlighten);
        }

        slides[slideIdx].style.display = 'block'; // make it visible
        slides[slideIdx].classList.add(style.enlighten);

        slideIdx++;

        if(slideIdx == slides.length) slideIdx = 0; // set back to first element
    }

    useEffect(() => {
        // good practice
        let timeout = setInterval(carousel, 4000); // re-run function after every 4secs
        setTimer(timeout);

        return () => {
            clearInterval(timeout);
        }
    }, []);

    return (
        <>
            <img style={{marginLeft: '20rem', marginTop: '5rem', height: '70vh'}} src="https://static.wixstatic.com/media/5e9072_d5f413e750dc4d84a1c8650a354ced41~mv2.png/v1/fill/w_314,h_634,al_c,q_85,usm_0.66_1.00_0.01/googlepixel4%20(1).webp" />
            <img className="mySlides" style={{position: 'absolute', left: '18.5rem', top: '9rem', height: '60vh', borderRadius: '30px', boxShadow: '0px 3px 5px #333'}} src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg" />
            <img className="mySlides" style={{position: 'absolute', left: '18.5rem', top: '9rem', height: '60vh', borderRadius: '30px', boxShadow: '0px 3px 5px #333'}} src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg" />
            <img className="mySlides" style={{position: 'absolute', left: '18.5rem', top: '9rem', height: '60vh', borderRadius: '30px', boxShadow: '0px 3px 5px #333'}} src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
            <SignupCard name={setName} email={setEmail} password={setPassword} file={handleFileSubmit} signup={handleSignup} /> 
        </>
    );
}

export default Signup;
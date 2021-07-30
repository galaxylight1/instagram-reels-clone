import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';
import LoginCard from './LoginCard';
import style from './Login.module.css';

let slideIdx = 0;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    
    const history = useHistory();
    const { login, currentUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('Logging in user');
            setLoading(true);
            await login(email, password);
            setLoading(false);
            history.push('/');
        }
        catch {
            setError('Failed to login!'); // state changed, causes a re-render
            setTimeout(() => setError(''), 2000);
            setLoading(false);
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
        let timeout;
        if(currentUser)
        {
            history.push('/');
        }
        else
        {
            // good practice
            timeout = setInterval(carousel, 4000); // re-run function after every 4secs
            setTimer(timeout);
        }

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

            <LoginCard name={setName} password={setPassword} login={handleLogin} error={error}/> 
        </>
    );
}

export default Login;
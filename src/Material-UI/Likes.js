import React, {useEffect, useState, useContext} from 'react';
import {database} from '../firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { AuthContext } from '../Context/AuthProvider';

function Likes({ postData }) {
    const [like, setLike] = useState(null);
    const { currentUser } = useContext(AuthContext); 

    useEffect(() => {
        let check = postData.likes.includes(currentUser?.uid) ? true : false;
        setLike(check);
    }, [postData]);

    const handleLike = async () => {
        if(like == true)
        {
            // unlike, spread not required when using filter
            let uArr = postData.likes.filter(el => {
                return el != currentUser.uid;
            });
            
            await database.posts.doc(postData.postId).update({
                likes: uArr,
            });
        }
        else
        {
            // like
            let uArr = [...postData.likes, currentUser.uid];

            await database.posts.doc(postData.postId).update({
                likes: uArr,
            });
        }
    }

    return (
        <div>
            {
                like != null ?  <>
                    {like == false ? <FavoriteBorderIcon style={{color: 'white', opacity: '0.7', zIndex: '3'}} onClick={handleLike} /> : <FavoriteIcon style={{color: '#e74c3c', opacity: '0.7', zIndex: '3'}} onClick={handleLike} />}
                </>
                : <></>
            }
        </div>
    );
}

export default Likes;
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import {v4 as uuidv4} from 'uuid';
import {storage, database} from '../firebase';

function UploadFile(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const types = ['video/mp4', 'video/webm', 'video/ogg'];

    const onChange = (e) => {
        const file = e?.target?.files[0];

        // checks
        if(!file)
        {
            setError('Please select a file!');
            setTimeout(() => setError(null), 2000);
            return;
        }
        if(types.indexOf(file.type) == -1)
        {
            setError('Please select a video file!');
            setTimeout(() => setError(null), 2000);
            return;
        }
        if(file.size / (1024 * 1024) > 100) // file size greater than 100mb!
        {
            setError('The selected file is too big!');
            setTimeout(() => setError(null), 2000);
            return;
        }

        const id = uuidv4();
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);

        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }

        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError(null)
            },2000);
            setLoading(false)
        }

        async function fn3() {
            setLoading(true);
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                let obj = {
                    comments: [],
                    likes: [],
                    pId: id,
                    pUrl: url, 
                    uName: props?.userData?.username,
                    uProfile: props?.userData?.profileUrl,
                    userId: props?.userData?.userId,
                    createdAt: database.getCurrentTimeStamp(),
                }
                database.posts.add(obj).then(async docRef => {
                    let parrId = docRef.id;
                    let res = await database.users.doc(props.userData.userId).update({
                        postIds: [...props.userData.postIds, docRef.id]
                    })
                }).then(() => {
                    setLoading(false);
                }).catch(e => {
                    setError(e);
                    setTimeout(() => setError(null), 2000);
                    setLoading(false);
                });
            });
        }
    }
    
    return (
        <>
        {
            error != null ? <Button disabled variant="outlined" component='span' style={{ marginTop: '5.5rem', marginLeft: '19rem', marginBottom: '1rem' }}
            size='medium' color="secondary" startIcon={ <MovieIcon /> } size="small">
                {error}
            </Button> :
            <>

            <input 
            color='primary'
            type='file'
            id='icon-button-file'
            onChange={onChange}
            style={{display:'none'}}
            />
            <label htmlFor='icon-button-file'>
            <Button disabled={loading} variant="outlined" component='span' style={{ marginTop: '5.5rem', marginLeft: '69rem', marginBottom: '1rem', position: 'absolute'}}
            size='medium' color="secondary" startIcon={ <MovieIcon /> } size="small">
                Upload Video
            </Button>

            </label>

            { loading ? <LinearProgress color='secondary' style={{width: '100%', height: '0.2rem', zIndex: '3', position: 'absolute', top: '4rem'}} /> : <></> }

            </>
        }
        </>
    );
}

export default UploadFile;


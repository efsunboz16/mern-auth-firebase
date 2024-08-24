import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../../firebase';
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../redux/user/userslice';


const Profile = () => {
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch()

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
            }
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error))
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto flex flex-col items-center'>
            <h1 className='text-3xl font-semibold text-center my-7'>PROFILE</h1>
            <form onSubmit={handleSubmit} className='flex flex-col w-5/6 gap-7'>
                <input
                    type="file"
                    ref={fileRef}
                    className='hidden'
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile"
                    className='self-center rounded-full cursor-pointer object-cover'
                    onClick={() => fileRef.current.click()}
                />

                <p className='flex justify-center flex-row w-full'>
                    {imageError ? (
                        <span>Error uploading image</span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span>{`Uploading: ${imagePercent}%`}</span>
                    ) : imagePercent === 100 ? (
                        <span className='text-green-500'>Image uploaded successfully</span>
                    ) : ''}
                </p>

                <input
                    type="text"
                    defaultValue={currentUser.username}
                    id='username'
                    placeholder='Username'
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type="email"
                    defaultValue={currentUser.email}
                    id='email'
                    placeholder='Email'
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id='password'
                    placeholder='Password'
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    Update
                </button>
            </form>
            <div className='w-full flex flex-row justify-between pl-10 pr-10 mt-3'>
                <span>Delete Account</span>
                <span>Signout</span>
            </div>
        </div>
    )
}

export default Profile;


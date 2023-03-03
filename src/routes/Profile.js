import jwt_decode from 'jwt-decode';

const Profile = () => {
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);

    return(
        <div className="panel">
            <h1>Welcome {username}!</h1>
        </div>
    )
};

export default Profile;
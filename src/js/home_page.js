import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      history.push('/login');
    } else {
      setUserData(user);
    }
  }, [history]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.userName}</h1>
      <p>Your role: {userData.roles.join(', ')}</p>
      {/* Add more details or components specific to the user's role */}
    </div>
  );
}

export default HomePage;

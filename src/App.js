import React, { useEffect, useState } from 'react';


const UserInfoBlock = (props) => {
  const { username, roles, loading } = props;
  if (loading) {
    return (
      <div className="userinfo">
        Loading ...
      </div>
    );
  }
  if (!username || username == null) {
    return (
      <div className="userinfo">
        <p>You need to <a href="/.auth/login/aad">Login with Azure AD</a> to use this page</p>
      </div>
    );
  } 
  return (
    <div className="userinfo">
      <p>Hello {username}</p>
      <p>You have been assigned the following roles:</p>
      <ul>
        {roles.map((role) => {
          return (
            <li key={role}>{role}</li>
          )
        })}
      </ul>
    </div>
  );
};


function App() {
  const [userInfo, setUserInfo] = useState({
    username: null,
    roles: null,
    loading: false
  })

  useEffect(() => {
    setUserInfo({ loading: true })
    const apiUrl = '/.auth/me';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((userData) => {
        setUserInfo({
          username: userData.clientPrincipal?.userDetails,
          loading: false,
          roles: userData.clientPrincipal?.userRoles
        })
      });
  }, [setUserInfo]);
  
  return <UserInfoBlock roles={userInfo.roles} username={userInfo.username} loading={userInfo.loading} />;
}

export default App;

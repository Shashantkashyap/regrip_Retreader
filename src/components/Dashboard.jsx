import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {

  const userData = useSelector(state => state.user.userData);

  useEffect(() => {
    console.log("UserData: ", userData);
  }, [userData]);
  
  return (
    <div>
      Welcome user_id {userData?.user_id} Dashboard
    </div>
  );
}

export default Dashboard;

'use client';

import axios from 'axios';

const GetUserButton = () => {
  const getUsers = async () => {
    const users = await axios.get('/api/user/getUsers');
    console.log('DEBUG_AZV <-----> users:', users.data);
  };
  return (
    <button
      onClick={() => {
        getUsers();
      }}
    >
      Get Users
    </button>
  );
};

export default GetUserButton;

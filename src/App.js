import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [updateUserId, setUpdateUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post('/api/users', { name, username });
      fetchUsers();
      setName('');
      setUsername('');
    } catch (error) {
      console.error(error);
    }
  };
  const updateUser = async (id, newName, newUsername) => {
    try {
      await axios.put(`/api/users/${id}`, { name: newName, username: newUsername });
      fetchUsers();
      setUpdateUserId(null);
      setUpdatedName('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateClick = (id, name) => {
    setUpdateUserId(id);
    setUpdatedName(name);
  };
  

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="main-heading">User Management</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={addUser} className="add-button">
          Add User
        </button>
      </form>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.id === updateUserId ? (
              <>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button onClick={() => updateUser(user.id, updatedName, user.username)}>
                  Save
                </button>
                <button onClick={() => setUpdateUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{`${user.name} (${user.username})`}</span>
                <button onClick={() => handleUpdateClick(user.id, user.name)}>Update</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
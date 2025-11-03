import { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <h2>List of Users</h2>
        <div className="contact-grid">
          {users.map((user) => (
            <div className="contact-card" key={user.id}>
              <h4>{user.name}</h4>
              <p>Company: {user.company.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UsersList;

import { useEffect, useState } from 'react';
import './App.css';
// import UsersList from './components/UsersList';
import SecTeams from './components/SecTeams';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const getMsg = async () => {
        const response = await fetch('http://localhost:3000/api/hello');
        const data = await response.json();
        const message = data.message;

        setMessage(message);
      };

      getMsg();
    } catch (error) {
      console.error('Error fetching message from api:', error);
    }
  }, []);

  return (
    <>
      <h1>React Playground</h1>
      <h2>Message from the api</h2>
      <p>{message}</p>
      {/* <UsersList /> */}
      <SecTeams />
    </>
  );
}

export default App;

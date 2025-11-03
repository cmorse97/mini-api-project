import { useEffect, useState } from 'react';

export default function SecTeams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    try {
      const fetchTeams = async () => {
        const response = await fetch('http://localhost:3000/api/sec/teams');
        const teamsList = await response.json();

        setTeams(teamsList);
      };

      fetchTeams();
    } catch (error) {
      console.error('Error fetching teams from api:', error);
    }
  }, []);

  return (
    <>
      <h4>List of SEC Football Teams</h4>
      <ul>
        {teams.map((team, idx) => (
          <li key={idx}>
            <p>
              {team.university} {team.nickname}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

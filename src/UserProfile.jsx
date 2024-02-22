import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(10);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setUserData(userResponse.data);
        setRepos(repoResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.name}</h1>
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
          <p>{userData.bio}</p>
          <p>Number of repositories: {userData.public_repos}</p>
        </div>
      )}

      <h2>Repositories</h2>
      {currentRepos.map((repo) => (
        <div key={repo.id}>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          {repo.topics && <p>Topics: {repo.topics.join(', ')}</p>}
        </div>
      ))}

      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(repos.length / reposPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
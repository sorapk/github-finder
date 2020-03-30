import React, { Fragment, useEffect, useContext } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';
import GithubContext from '../../context/github/githubContext';

const Home = () => {
  const githubContext = useContext(GithubContext);

  // Component Didmount
  useEffect(() => {
    githubContext.searchUsers('');
    return () => {
      // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Component Did Update
  //   useEffect(() => {
  //     // warn user of API limit
  //     if (githubContext.apiLog !== '') {
  //       alertContext.setAlert(githubContext.apiLog, 'warning', 4000);
  //       githubContext.clearApiLog();
  //     }
  //     return () => {
  //       // cleanup
  //     };
  //   });

  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;

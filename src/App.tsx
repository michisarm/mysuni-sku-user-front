
import React from 'react';

import StoreProvider from './StoreProvider';
import Routes from './Routes';


if (process.env.NODE_ENV === 'development') {
  const cineroomId = 'ne1-m1-c1';
  // const cineroomId = 'ne1-m1-c2';

  const workspaces = {
    cineroomWorkspaces: [
      { id: 'ne1-m1-c1', name: 'Cineroom1', tenantId: 'o1-r@ne1-m1-c1', roles: ['User', 'Admin']},
      { id: 'ne1-m1-c2', name: 'Cineroom2', tenantId: 'o1-r@ne1-m1-c2', roles: ['User']},
    ],
    pavilionWorkspaces: [
      { id: 'ne1-m1', name: 'Pavilion1', tenantId: 'o1@ne1-m1', roles: ['Admin']},
    ],
    stationWorkspaces: null,
    squareWorkspaces: null,
    studioWorkspace: null,
  };
  sessionStorage.setItem('cineroomId', cineroomId);
  sessionStorage.setItem('workspaces', JSON.stringify(workspaces));
  sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqc3Nlb3Rlc3QxQGdtYWlsLmNvbSIsImRpc3BsYXlOYW1lIjoiVGVzdCBqaXN1ICIsInNjb3BlIjpbImNsaWVudCJdLCJ3b3Jrc3BhY2VzIjp7InN0YXRpb25Xb3Jrc3BhY2VzIjpudWxsLCJzcXVhcmVXb3Jrc3BhY2VzIjpudWxsLCJwYXZpbGlvbldvcmtzcGFjZXMiOlt7ImlkIjoibmUxLW0xIiwibmFtZSI6Im5ldyBQYXYiLCJ0ZW5hbnRJZCI6Im8xQG5lMS1tMSIsInJvbGVzIjpudWxsfSx7ImlkIjoibmUxLW0yIiwibmFtZSI6Im5ldyBQYXYyIiwidGVuYW50SWQiOiJvMUBuZTEtbTIiLCJyb2xlcyI6bnVsbH1dLCJjaW5lcm9vbVdvcmtzcGFjZXMiOlt7ImlkIjoibmUxLW0xLWMxIiwibmFtZSI6Im5ldyBQYXYiLCJ0ZW5hbnRJZCI6Im8xLXJAbmUxLW0xLWMxIiwicm9sZXMiOm51bGx9LHsiaWQiOiJuZTEtbTEtYzUiLCJuYW1lIjoi44WH44WHIiwidGVuYW50SWQiOiJvMS1yQG5lMS1tMS1jNSIsInJvbGVzIjpbIlVzZXIiXX1dLCJzdHVkaW9Xb3Jrc3BhY2UiOm51bGx9LCJleHAiOjE1NzQ4MjY3NjcsImF1dGhvcml0aWVzIjpbIlVzZXIiXSwianRpIjoiMTcyOGRhZTEtMDk5Yi00MTc1LWJhZmUtMmI2ODBiZmM5ODM3IiwiY2xpZW50X2lkIjoibmFyYSJ9.KoocxmngtX8r0Re9ka3VlfoucKJoISI-8tOPwSzi2qY');
}


function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;

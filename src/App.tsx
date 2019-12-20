
import React from 'react';
import { axiosApi } from '@nara.platform/accent';

import StoreProvider from './StoreProvider';
import Routes from './Routes';


if (process.env.NODE_ENV === 'development') {
  axiosApi.setDevelopmentMode(
    {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJTS0NDLjA1NTAzQHNrLmNvbSIsImRpc3BsYXlOYW1lIjoi6rmA7JqwKioiLCJzY29wZSI6WyJjbGllbnQiXSwid29ya3NwYWNlcyI6eyJzdGF0aW9uV29ya3NwYWNlcyI6bnVsbCwic3F1YXJlV29ya3NwYWNlcyI6bnVsbCwicGF2aWxpb25Xb3Jrc3BhY2VzIjpudWxsLCJjaW5lcm9vbVdvcmtzcGFjZXMiOlt7ImlkIjoibmUxLW0yLWMyIiwibmFtZSI6IlNLIFVuaXZlcnNpdHkiLCJ0ZW5hbnRJZCI6InI5OC1yQG5lMS1tMi1jMiIsInJvbGVzIjpbIlVzZXIiXX0seyJpZCI6Im5lMS1tMi1jMTciLCJuYW1lIjoiU0so7KO8KUMmQyIsInRlbmFudElkIjoicjk4LXJAbmUxLW0yLWMxNyIsInJvbGVzIjpbIlVzZXIiXX1dLCJzdHVkaW9Xb3Jrc3BhY2UiOm51bGx9LCJleHAiOjE1NzY4MTIyNTQsImF1dGhvcml0aWVzIjpbIlVzZXIiXSwianRpIjoiNWVlZjgzZWUtMTVkMC00YWNlLTlkMjktODM5NThjMjljODQ0IiwiY2xpZW50X2lkIjoibmFyYSJ9.HXdZSJ52ytsio3PTmpFJ4B3d66ifN9mE_bmlmAi8A98',
    },
  );
}


function App() {
  return (
    <StoreProvider>
      <Routes />
    </StoreProvider>
  );
}

export default App;

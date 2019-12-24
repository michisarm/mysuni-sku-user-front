
import React from 'react';
import { axiosApi } from '@nara.platform/accent';

import StoreProvider from './StoreProvider';
import Routes from './Routes';


if (process.env.NODE_ENV === 'development') {
  axiosApi.setDevelopmentMode(
    {
      displayName: 'Sk univ',
      audienceId: 'o1-r@ne1-m2-c2',
      cineroomId: 'ne1-m2-c2',
      workspaces: {
        cineroomWorkspaces: [{ id: 'ne1-m1-c2', name: 'Development team', tenantId: 'o1-r@ne1-m1-c2', roles: ['Admin', 'User']}, { id: 'ne1-m2-c2', name: 'SK University', tenantId: 'o1-r@ne1-m2-c2', roles: ['Admin', 'User']}],
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsSW5mb3JtYXRpb24iOm51bGwsInVzZXJfbmFtZSI6InNrdW5pdkBuZXh0cmVlLmlvIiwiZGlzcGxheU5hbWUiOiJTayB1bml2ICIsInNjb3BlIjpbImNsaWVudCJdLCJ3b3Jrc3BhY2VzIjp7InN0YXRpb25Xb3Jrc3BhY2VzIjpbeyJpZCI6ImU2ZmFhYTkzLTIwNWUtNGNjNC04NjkxLTQ3ODcyYWYwNWZhYyIsIm5hbWUiOiJOYXJhIFN0YXRpb24iLCJ0ZW5hbnRJZCI6ImUzM2M1ZjY2LWQ0MzItNDNhZS1hZmJiLWY0OTk0N2ViYWFhOCIsInJvbGVzIjpudWxsfV0sInNxdWFyZVdvcmtzcGFjZXMiOlt7ImlkIjoibmUxIiwibmFtZSI6IlNLIFVuaXYiLCJ0ZW5hbnRJZCI6Im5lMSIsInJvbGVzIjpudWxsfV0sInBhdmlsaW9uV29ya3NwYWNlcyI6W3siaWQiOiJuZTEtbTEiLCJuYW1lIjoiRGV2ZWxvcGVyIENlbnRlciIsInRlbmFudElkIjoibzFAbmUxLW0xIiwicm9sZXMiOm51bGx9LHsiaWQiOiJuZTEtbTIiLCJuYW1lIjoiU0sgTGVhcm5pbmcgU3BhY2UiLCJ0ZW5hbnRJZCI6Im8xQG5lMS1tMiIsInJvbGVzIjpudWxsfV0sImNpbmVyb29tV29ya3NwYWNlcyI6W3siaWQiOiJuZTEtbTEtYzIiLCJuYW1lIjoiRGV2ZWxvcG1lbnQgdGVhbSIsInRlbmFudElkIjoibzEtckBuZTEtbTEtYzIiLCJyb2xlcyI6WyJBZG1pbiIsIlVzZXIiXX0seyJpZCI6Im5lMS1tMi1jMiIsIm5hbWUiOiJTSyBVbml2ZXJzaXR5IiwidGVuYW50SWQiOiJvMS1yQG5lMS1tMi1jMiIsInJvbGVzIjpbIkFkbWluIiwiVXNlciJdfV0sInN0dWRpb1dvcmtzcGFjZSI6bnVsbH0sImV4cCI6MTU3NzE3OTM5MiwiYXV0aG9yaXRpZXMiOlsiVXNlciJdLCJqdGkiOiJlZDJiMGVmNC02NzRhLTQ2ZWEtOGE4Ni1kZTg1OTVhZDQwNWEiLCJjbGllbnRfaWQiOiJuYXJhIn0.BjBEcuoyv0fTBj4bmzkFvUIjpe7xXtbIDsrek6DL4OU',
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

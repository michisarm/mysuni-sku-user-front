
import React from 'react';
import { axiosApi } from '@nara.platform/accent';

import StoreProvider from './StoreProvider';
import Routes from './Routes';


if (process.env.NODE_ENV === 'development') {
  axiosApi.setDevelopmentMode(
    {
      displayName: '홍길**',
      audienceId: 'r6b-r@ne1-m2-c17',
      cineroomId: 'ne1-m2-17',
      workspaces: {
        cineroomWorkspaces: [{ id: 'ne1-m1-c2', name: 'ne1-m2-c2', tenantId: 'r6b-r@ne1-m2-c2', roles: ['Admin', 'User']}, { id: 'ne1-m2-17', name: 'SK(주)C&C', tenantId: 'r6b-r@ne1-m2-c17', roles: ['Admin', 'User']}],
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsSW5mb3JtYXRpb24iOnsiY29tcGFueUNvZGUiOiJTS0NDIiwiZW1wbG95ZWVJZCI6IjAwMDAzMzMxIn0sInVzZXJfbmFtZSI6IlNLQ0MuMDAwMDMzMzFAc2suY29tIiwiZGlzcGxheU5hbWUiOiLtmY3quLgqKiIsInNjb3BlIjpbImNsaWVudCJdLCJ3b3Jrc3BhY2VzIjp7InN0YXRpb25Xb3Jrc3BhY2VzIjpudWxsLCJzcXVhcmVXb3Jrc3BhY2VzIjpudWxsLCJwYXZpbGlvbldvcmtzcGFjZXMiOm51bGwsImNpbmVyb29tV29ya3NwYWNlcyI6W3siaWQiOiJuZTEtbTItYzIiLCJuYW1lIjoiU0sgVW5pdmVyc2l0eSIsInRlbmFudElkIjoicjZiLXJAbmUxLW0yLWMyIiwicm9sZXMiOlsiVXNlciJdfSx7ImlkIjoibmUxLW0yLWMxNyIsIm5hbWUiOiJTSyjso7wpQyZDIiwidGVuYW50SWQiOiJyNmItckBuZTEtbTItYzE3Iiwicm9sZXMiOlsiVXNlciJdfV0sInN0dWRpb1dvcmtzcGFjZSI6bnVsbH0sImV4cCI6MTU3NzM0MjA1OSwiYXV0aG9yaXRpZXMiOlsiVXNlciJdLCJqdGkiOiIwMzdjYzYyMy0xMzJiLTRiYjctOTZjZi00NGM0ZjU5ZGJlYzkiLCJjbGllbnRfaWQiOiJuYXJhIn0.Yo-6-4V30XQnxHk_2sA2XRNMxRctZDfYtayNZv1cgjw',
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

import { getAxios } from '../api/getAxios';

export function onLogin() {
  const state = {
    id: 'myutopia@sk.com',
  };

  const postData = new URLSearchParams();
  postData.append('grant_type', 'password');
  postData.append('scope', 'client');
  postData.append('username', state.id);
  postData.append('password', '1');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: 'Basic ' + btoa('nara:narasecret'),
    },
  };

  return getAxios()
    .post('/api/checkpoint/oauth/token', postData, config)
    .then((res: any) => {
      if (!res.data.access_token) {
        return;
      }

      const accessToken = res.data.access_token;

      document.cookie = 'nara.isLogin=true';
      localStorage.setItem('nara.token', accessToken);
      localStorage.setItem(
        'nara.workspaces',
        JSON.stringify(res.data.workspaces)
      );
      localStorage.setItem(
        'nara.displayName',
        JSON.stringify(res.data.displayName)
      );
      localStorage.setItem('nara.email', state.id);
      localStorage.setItem('nara.cineroomId', 'ne1-m2-c2');
      localStorage.setItem('dashBoardSentenceIndex', 'undefined');
      localStorage.setItem('nara.companyCode', 'SKCC');

      if (
        res.data.additionalInformation &&
        res.data.additionalInformation.companyCode
      ) {
        localStorage.setItem(
          'nara.companyCode',
          res.data.additionalInformation.companyCode
        );
      }
    });
}

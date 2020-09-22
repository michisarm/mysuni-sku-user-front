This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Code autoformat 적용

1. ESLint, Prettier - Code formatter 설치
2. git 에서 .prettierrc 파일 pull
3. vscode
- Prettier Extension 설치 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- .vscode/settings.json 파일을 아래 설정을 참조하여 변경(코드 저장시 포맷이 적용됩니다.)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "typescript.format.enable": false
}
```   
   
4. IntelliJ : Settings - Languages & Frameworks - JavaScript - Code Quality Tools - ESLint
   Enable = 체크해줌
   Ctrl + Alt + Shift + P 눌러서 format 하고 저장

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build_app`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build_lib`

Builds the snap to the `lib` folder.<br>

### `npm run json_server`

Runs the json-server in the development mode.<br>
You can test before Working together your back-end server.

## Proxy

In you package.json, you can have only one proxy definition.<br>
If you want to specify proxy more detail, make '/config/proxy.js' like this.

proxy.js

```javascript
module.exports = {
  '/api/sample': {
    target: 'http://localhost:8082',
    pathRewrite: { '/api/sample': '/' },
  },
  '/api/tenant': {
    target: 'http://localhost:8099',
  },
};
```

Then, don't forget delete your package.json proxy definition.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

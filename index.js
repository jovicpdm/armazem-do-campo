
import {AppRegistry, LogBox} from 'react-native';
import Routes from './src/router';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Routes);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']); 

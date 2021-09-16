/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Routes from './src/router';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Routes);

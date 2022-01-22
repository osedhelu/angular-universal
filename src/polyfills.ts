import 'classlist.js';  // Run `npm install --save classlist.js`.

import 'web-animations-js';  // Run `npm install --save webå-animations-js`.

import 'core-js/es/reflect';


import '@angular/localize/init';

import 'zone.js';
declare const window: any
declare const global: any
import * as process from 'process';
import { Buffer } from 'buffer';

window.process = process;
(window as any).global = window;
global.Buffer = global.Buffer || Buffer;
// (window as any).global = window;
// global.Buffer = global.Buffer || require('buffer').Buffer;
// global.process = require('process');

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

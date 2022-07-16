#!/usr/bin/env node
import { findConfigCLI } from './find-config';
import { quickstart } from './quickstart';
import { ssg } from './ssg';
import { color } from 'terminal-color';

switch(process.argv[2]) {
	case 'quickstart':
		quickstart();
		break;
	case 'ssg':
		ssg();
		break;
	case 'find-config':
		console.log('ssg:');
		findConfigCLI('ssg');
		console.log('ssr:');
		findConfigCLI('ssr');
		break;
	default:
		console.log(color.fg.red('no command entered: ["locate-config", "quickstart", "ssg"]'));
		break;
}

import { DebugEventType } from '../types';

export const HCL_EVENT_MAP: DebugEventType[] = [
	{
		phase: 0,
		signature: 'loader:init',
		fatal: false
	},
	{
		phase: 0,
		signature: 'watch:init',
		fatal: false
	},
	{
		phase: -1,
		signature: 'file:change',
		fatal: false
	},
	{
		phase: 1,
		signature: 'partial:load',
		fatal: false
	},
	{
		phase: 2,
		signature: 'template:load',
		fatal: false
	}
];
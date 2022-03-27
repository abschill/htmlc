import { FG_COLOR_ESCAPES, BG_COLOR_ESCAPES } from './util';
import { RMap } from './map';
export type RT_EVENT_DATA = {
    template_name: string; 
    u_insert_map: object; 
    c_insert_map: RMap;
}

export type HCL_EVENT_SIGNATURE = 'file:change' | 'watch:init' | 'loader:init' | 'template:load';

export enum HCL_EVENT_TYPE_MAP {
    STATUS = 0,
    TRIGGER = 1,
    WARNING = 2,
    ERROR = 3
}

export type HCL_EVENT_PHASE = -1 | 0 | 1 | 2;
export type HCL_EVENT_TYPE = 0 | 1;


export type HCL_EVENT = {
	phase: HCL_EVENT_PHASE;
	type: HCL_EVENT_TYPE_MAP;
	signature: HCL_EVENT_SIGNATURE;
	fatal: boolean;
}

export interface HCL_RUNTIME_EVENT extends HCL_EVENT {
    event_data: string | object;
}

export type STDColorType = FG_COLOR_ESCAPES | BG_COLOR_ESCAPES;

export type STDColorInput = STDColorType | STDColorType[];
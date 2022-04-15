export const ABT_RENDER_SIGNATURE = '@render';
export const ABT_PARTIAL_SIGNATURE = '@partial';
export const ABT_LOOP_SIGNATURE = '@loop';
// export const ABT_PGROUP_SIGNATURE = '@partials';

export const ABT_PARTIAL_REGGIE = /<!--@partial=\w+[\w|\d|/\\]*-->/gi;
export const ABT_RENDER_REGGIE = /<!--@render=\w+.?[\w|\d|.]+-->/gi;
export const ABT_LOOP_OPEN_REGGIE = /<!--@loop\(\w+\){/gi;
// export const ABT_PGROUP_REGGIE = /<!--@partials=\([\w+,]+\)/gi;

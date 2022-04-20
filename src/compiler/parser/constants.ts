export const ABT_DT = '@';
export const ABT_RENDER_SIGNATURE = `${ABT_DT}render`;
export const ABT_PARTIAL_SIGNATURE = `${ABT_DT}partial`;
export const ABT_LOOP_SIGNATURE = `${ABT_DT}loop`;
// export const ABT_PGROUP_SIGNATURE = '@partials';

export const ABT_PARTIAL_REGGIE = /<!--@partial=\w+[\w|\d|/\\]*-->/gi;
export const ABT_RENDER_REGGIE = /<!--@render=\w+.?[\w|\d|.]+-->/gi;
export const ABT_LOOP_OPEN_REGGIE = /<!--@loop\(\w+\){/gi;
// export const ABT_PGROUP_REGGIE = /<!--@partials=\([\w+,]+\)/gi;

export const ABT_OPEN_SCOPE = '<!--';
export const ABT_CLOSE_SCOPE = '-->';
export const ABT_CLOSE_LOOP_SCOPE = '}' + ABT_CLOSE_SCOPE;
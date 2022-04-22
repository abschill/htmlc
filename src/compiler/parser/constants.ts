export const AST_DT = '@';
export const AST_EQ = '=';
export const SELF = '_';
export const AST_KNO = '(';
export const AST_KNC = ')';
export const AST_TNO = '{';
export const AST_TNC = '}';
export const AST_KEYSELF = `${AST_TNO}${SELF}${AST_TNC}`;

export const AST_RENDER_SIGNATURE = `${AST_DT}render`;
export const AST_PARTIAL_SIGNATURE = `${AST_DT}partial`;
export const AST_LOOP_SIGNATURE = `${AST_DT}loop`;
// export const ABT_PGROUP_SIGNATURE = '@partials';

export const AST_PARTIAL_REGGIE = /<!--@partial=\w+[\w|\d|/\\]*-->/gi;
export const AST_RENDER_REGGIE = /<!--@render=\w+.?[\w|\d|.]+-->/gi;
export const AST_LOOP_OPEN_REGGIE = /<!--@loop\(\w+\){/gi;
// export const ABT_PGROUP_REGGIE = /<!--@partials=\([\w+,]+\)/gi;

export const AST_OPEN_SCOPE = '<!--';
export const AST_CLOSE_SCOPE = '-->';
export const AST_CLOSE_LOOP_SCOPE = AST_TNC + AST_CLOSE_SCOPE;


export const AST_NESTED_KEYPARSE = /{\w+.?[\w|\d]*}/gi;

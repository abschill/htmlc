
const DOCTYPE = '<!DOCTYPE html>';
const OPEN_HTML = '<html';
const CLOSE_HTML = '</html>';
const HEAD_OPEN = '<head>';
const HEAD_CLOSE = '</head>';
const BODY_OPEN = '<body';
const BODY_OPEN_BLANK = '<body>';
const BODY_CLOSE = '</body>';

export const cleanHTML = (
	copy: string,
	lang ?: string
): string => {
    if(!lang) lang = 'en';
    const intl_sig = `${OPEN_HTML} lang="${lang}">`;
    if(!copy.includes(BODY_OPEN)) {
        if(copy.includes(HEAD_OPEN)) {
            const headCache = copy.substring(0, copy.indexOf(HEAD_CLOSE) + HEAD_CLOSE.length);
            const bodyCache = copy.split(headCache).pop();
            copy = headCache + BODY_OPEN_BLANK + bodyCache + BODY_CLOSE;
        }
        else {
            copy = HEAD_OPEN + HEAD_CLOSE + BODY_OPEN_BLANK + copy + BODY_CLOSE;
        }
    }
    if(!copy.includes(OPEN_HTML)) copy = intl_sig + copy;
    if(!copy.includes(CLOSE_HTML)) copy = copy + CLOSE_HTML;
    if(!copy.includes(DOCTYPE)) copy = DOCTYPE + copy;
    return copy;
};

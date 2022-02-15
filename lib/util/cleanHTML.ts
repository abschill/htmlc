const enums = {
    DOCTYPE: '<!DOCTYPE html>',
    OPEN_HTML: '<html',
    OPEN_HTML_BLANK: '<html>',
    CLOSE_HTML: '</html>',
    HEAD_OPEN: '<head>',
    HEAD_OPEN_BLANK: '<head>',
    HEAD_CLOSE: '</head>',
    BODY_OPEN: '<body',
    BODY_OPEN_BLANK: '<body>',
    BODY_CLOSE: '</body>'
}
    
export const cleanHTML = ( htmlCopy: string ): 
string => {
    let copy = htmlCopy;
    const { 
        CLOSE_HTML, 
        OPEN_HTML, 
        OPEN_HTML_BLANK, 
        DOCTYPE,
        HEAD_OPEN,
        HEAD_CLOSE,
        BODY_OPEN,
        BODY_OPEN_BLANK,
        BODY_CLOSE
     } = enums;
    

    if( !copy.includes( BODY_OPEN ) ) {
        if( copy.includes( HEAD_OPEN ) ) {
            let headCache = copy.substring( 0, copy.indexOf( HEAD_CLOSE ) + HEAD_CLOSE.length );
            const bodyCache = copy.split( headCache ).pop();
            copy = headCache + BODY_OPEN_BLANK + bodyCache + BODY_CLOSE;
        }
        else {
            copy = HEAD_OPEN + HEAD_CLOSE + BODY_OPEN_BLANK + copy + BODY_CLOSE;
        }
    }
    if( !copy.includes( CLOSE_HTML ) ) {
        copy = copy + CLOSE_HTML;
    }

    if( !copy.includes( OPEN_HTML ) ) {
        copy = OPEN_HTML_BLANK + copy;
    }

    if( !copy.includes( DOCTYPE ) ) {
        copy = DOCTYPE + copy;
    }

    return copy;
}
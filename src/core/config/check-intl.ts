import {
    toLocale,
    AnyLoadConfig
} from '../../types';
const { warn } = console;

export function checkIntlCode(
    u_config: AnyLoadConfig
): string {
    if( !u_config || !u_config.intlCode ) return 'en-US';
    if( u_config && u_config.errorSuppression ) {
        try {
            return toLocale( u_config.intlCode );
        }
        catch( e ) {
            warn( 'Language Code Failed to Register, please ensure you enter a valid intl lang/country code' );
            warn( e );
            return 'en-us';
        }
    }
    else {
        return toLocale( u_config.intlCode );
    }
}
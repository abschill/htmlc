import { UUDebugConfig, DebugConfig } from '../../types';
import { DEBUG_BOOLTRUE, DEBUG_DEFAULTS } from '../../util/index';
export function checkDebug(
    opt: UUDebugConfig
): DebugConfig {
    if( typeof opt === 'boolean' ) {
        return opt === true ? DEBUG_BOOLTRUE: DEBUG_DEFAULTS;
    }
    else {
        return {...DEBUG_DEFAULTS, ...opt};
    }
}
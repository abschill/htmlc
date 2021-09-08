import Partial from "../partial";
import Template from '../template';
import Config from '../config/index';
export function getType( seg:Partial|Template ){
    if( seg instanceof Partial){
        return 'partial';
    }
    else {
        return 'template';
    }
}

export function renderVars ( pt: string, varList: Object[] ){
    const { _config } = new Config();
    let _copy = pt;
    const out = varList.map( item => Object.entries( item ) );
    const _vrs:Array<string>[] = out.flat();
    _vrs.forEach( vr => {
        const _replace = `<!--$${_config._internals.delimiter}=${vr[0]}-->`;
        _copy = _copy.replace( _replace , vr[1])
    });
    return _copy;
}
#!/usr/bin/env node
import { 
    findConfig, 
    ensureOutPath,
    getModuleFromBase,
    pathify,
    __write
} from './tools';
import { Loader } from '../loader';
import { SOptions } from '../core/internals/types';
const static_config: SOptions = findConfig();
ensureOutPath( static_config.outPath );

try {
    const data = getModuleFromBase( static_config.loaderFile );
    const ctx = Loader( {
        ...static_config,
        //@ts-ignore
        templateInput: data.templateInput,
        //@ts-ignore
        partialInput: data.partialInput,
    } );
    ctx.ctx.templates.forEach( template => {
        const fileData = {
            toName: pathify( template, static_config.outPath ),
            toWrite: ctx.template( template.name )
        };
        __write( fileData );
        return;
    } );
}
catch( e ) {
    console.warn( e );
}

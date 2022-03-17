/**
 *
 * @param { Runtime.Options } config configuration file for engine
 * @returns context for engine
 */
 import { core } from './core';
 import { fsUtil } from './core/internals/util/file';
 import { _DEFAULTS } from "./core/internals";
 
 export default ( config: core.Options ):
     core.Context => {
         const hydrated = clean( config );
         return  {
         config: hydrated,
         partials: fsUtil.resolvePartials( config ),
         templates: fsUtil.resolveTemplates( config )
     }
 }
 
 const clean = ( config: core.Options ):
     core.ROptions =>
     Object.keys( config ) === Object.keys( _DEFAULTS ) ?
         config as core.ROptions:
         { ..._DEFAULTS, ...config } as core.ROptions;
# 0.5.7
### tba

**new stuff**

createLoader argument additions:
- ```discoverPaths``` to determine whether or not template/partial directories will be walked or just used at base level search. 
- ```intlCode``` to validate lang of clean html helper
- ```cache``` to facilitate loader cache (wip)

**rename types**

CoreContext -> LoaderContext

CoreOptions -> E_SSROptions (E_* === Entity of * (no optional properties))

# 0.5.6
### 3/31/22
**IMPORTANT** if using the es6+ module, the named export is now ```createLoader``` rather than simply Loader, just to make it easier to avoid .d.ts name conflicts post-compilation. The return type is now Loader, rather than HCL_RUNTIME.

# 0.5.5
### 3/27/22
hotfix some stuff that i forgot to remove from dist folder in 0.5.1, will give type warnings in stdout but should still function the same

# 0.5.1
### 3/27/22
first major release in a month or so, debugger has gotten a lot more user friendly with new command line options and some work in progress new documentation, to be rolled out more this coming week. the ssg docs are also in place now at least for typedoc for the arguments and basic things. ability to log to a file now, and a lot of internal optimizations to reduce bundle size and decrease runtime execution speed. IMPORTANT: ssg is now keyed off the npx module with "ssg" rather than being the only bin module (it is for now, but its keyed to make room for other ones)

# 0.4.11
### 03/24/22
another minor patch bump for some internal changes & added unit tests

debugger still out of comission until v0.5.z

# 0.4.10
### 03/18/22
Fixed debugger deciding to ignore conditional running, will fix by 0.5.z

add types to export for loader def

# 0.4.7
### 03/17/22
CLI updates with newer version of codebase & tidy some other types

# 0.4.5
### 03/05/33
### Important 
@render-partial is now @partial as of v0.4.5
@for is now @loop as of v0.4.5
new debug points

# 0.4.4
### 2/26/22
fix type issue with array of string untyped output in typescript, error in stdout but still allowing program to run normally. 

# 0.4.3
### 2/19/22

fix type warning bugs and add details debug points with a new "debug" mode

# 0.3.0
### 2/14/22

update type defs and rename import for case sensitivity. add more types for ts interoperability

# 0.2.8
### 12/21/21

bugfix cleanhtml & types bug

# 0.2.4
### 12/07/21

types in package.json for intellisense, esm & typescript added to npm module export

# 0.2.2
### 11/09/21

add check for html doc declaration, html open/close, body tags

# 0.2.1
### 11/02/21

fixed bug with same-line token declaration

# 0.1.8
### 10/28/21

add watch mode for runtime file reload

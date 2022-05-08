# 0.6.16

## 05/08/2022

- add experimentalExtensions config option to allow loading of an exp. filetype we are thinking of integrating into this project outside of html comments themselves, for shaping a set of partials for a "shell" template of some kind.

## 0.6.12

## 04/24/22

- fix bug in quickstart module
- some other internal design changes
- made test code less disgusting

## 0.6.11

## 04/22/22

add find-config cli option to determine your default if you dont override in the `createLoader` function. this is just meant to improve QOL if you have some complex type setup or are just confused for whatever reason what your config is being loaded in as at runtime.

## 0.6.7

## 04/16/22

add bigger list of locale enum + remove utility types, debug rework with color escapes being less awkward from 0.6.6

## 0.5.13 / 0.5.14

## 04/06/22

add quickstart module to cli to quickly generate default folder structure & configuration

```cmd
npx html-chunk-loader quickstart
```

rename ts output path to `/lib`, and rename `lib` to `src` - update for ts import to `html-chunk-loader/lib/loader` you shouldn't need the .js extension now since it's not next to a .d.ts file its just an indexed directory. anyway, hopefully this restucturing doesnt break anything

## 0.5.11/0.5.12

### 04/06/22

add support for hcl-config.json, and proper layering of the priority for config defaults.

## 0.5.10

## 04/03/2022

add new default true option for preload, will load static partials when the loader is created rather than when each template is called, will be applied to templates resolving prerendered partials in 0.5.11

also renamed a lot of the c-style types to more human-readable pascal/camelcase naming conventions, and alphabetized the types file. In 0.5.9 i didnt make a log for some reason but I centralized the runtime storage for "chunks" as a type with a property determining if its a partial or template.

## 0.5.8

### 04/03/2022

updates to the discoverPaths partial naming, they will be namespaced with the directories rather than collected into the global partial registry during runtime, this will allow for namespaced nesting rather than arbitrary sorting QOL, now itll be both.

new unit tests, and reserved new debug points for 0.5.9

## 0.5.7

### 04/01/2022

**config updates**
can now define config fallbacks in hcl-config.js adjacent to package.json, or as an hcl_config property in package.json itself. Read more [here]((https://github.com/abschill/html-chunk-loader/blob/master/docs/reference/basics.md))

**new stuff**

createLoader argument additions:
- `discoverPaths` to determine whether or not template/partial directories will be walked or just used at base level search.
- `intlCode` to validate lang of clean html helper

**rename types**
CoreContext -> LoaderContext

CoreOptions -> E_SSROptions (E_* === Entity of * (no optional properties))

## 0.5.6

### 3/31/22

**IMPORTANT** if using the es6+ module, the named export is now ```createLoader``` rather than simply Loader, just to make it easier to avoid .d.ts name conflicts post-compilation. The return type is now Loader, rather than HCL_RUNTIME.

## 0.5.5

### 3/27/22

hotfix some stuff that i forgot to remove from dist folder in 0.5.1, will give type warnings in stdout but should still function the same

## 0.5.1

first major release in a month or so, debugger has gotten a lot more user friendly with new command line options and some work in progress new documentation, to be rolled out more this coming week. the ssg docs are also in place now at least for typedoc for the arguments and basic things. ability to log to a file now, and a lot of internal optimizations to reduce bundle size and decrease runtime execution speed. IMPORTANT: ssg is now keyed off the npx module with "ssg" rather than being the only bin module (it is for now, but its keyed to make room for other ones)

## 0.4.11

### 03/24/22

another minor patch bump for some internal changes & added unit tests

debugger still out of comission until v0.5.z

## 0.4.10

### 03/18/22

Fixed debugger deciding to ignore conditional running, will fix by 0.5.z

add types to export for loader def

## 0.4.7

### 03/17/22

CLI updates with newer version of codebase & tidy some other types

## 0.4.5

### 03/05/33

### Important

@render-partial is now @partial as of v0.4.5
@for is now @loop as of v0.4.5
new debug points

## 0.4.4

### 2/26/22

fix type issue with array of string untyped output in typescript, error in stdout but still allowing program to run normally.

## 0.4.3

### 2/19/22

fix type warning bugs and add details debug points with a new "debug" mode

## 0.3.0

### 2/14/22

update type defs and rename import for case sensitivity. add more types for ts interoperability

## 0.2.8

### 12/21/21

bugfix cleanhtml & types bug

## 0.2.4

### 12/07/21

types in package.json for intellisense, esm & typescript added to npm module export

## 0.2.2

### 11/09/21

add check for html doc declaration, html open/close, body tags

## 0.2.1

### 11/02/21

fixed bug with same-line token declaration

## 0.1.8

### 10/28/21

add watch mode for runtime file reload

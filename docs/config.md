# Configuration

### Constructor

#### Allowed Arguments

- _partialInput

Defines data for partials, scoped by name.

- rootDir
  
Defines root directory (relative to process.cwd()) to look for templates/partials

- templates

Template directory relative to root

- partials

Partial directory relative to root

- verbose

Runs in debug mode

### _static_config

This property in package.json allows you to set up a configuration for the static site generation utility contained in the CLI via NPX. 
#### Allowed Arguments

- root

Tells the cli where to start the directory tree (default views)

- partials

Tells the cli where to get the partials from (default partials)

- templates

Tells the cli where to get the templates from (default pages)

- outPath

Tells the cli where to build the pages

- loaderFile

Tells the cli where your file to load data for your templates

- cleanup

Tells the cli whether or not you want to clean the folder before building


### _partial_data 

This property in package.json allows you to declare your partial variables for static generation, or render SSR without cluttering up your constructor. It will be overridden by anything you pass in the constructor for your partials in a given loader (as you may want to use more than one in a project - for example authenticated pages versus public pages). You can also define your _partialInput using this instead of the constructor

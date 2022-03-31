# Introduction

When writing HTML, you have probably come across the issue of rewriting a lot of the same logic, or seeking to compartmentalize your semantic HTML markup into modules that can be called programmatically on the server, or generated for static serving at runtime. You may even want to do a bit of both! I had such desires when making this package, with a 90% reduction in bundle size compared to alternatives like handlebars, and the freedom to control the full cycle the way I wanted was not something I came to regret. 

The main concept to understand is the concept of a Loader. A Loader simply makes strings, formatted for the text/html [MIME type](https://datatracker.ietf.org/doc/html/rfc6838). What html-chunk-loader does is dynamically build HTML pages for you to give to a server's response as an HTML page. How you use the library is up to you, it is very unopinionated and configurable, no application is limited to one loader, can use one for any given server auth level, user state, etc. The choice is really yours.

[Loaders](https://github.com/abschill/html-chunk-loader/blob/master/docs/reference/loader.md)
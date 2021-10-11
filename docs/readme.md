# Getting Started

## Problem to Solve

You've probably written HTML pages before, and found yourself regularly copying the same segments of code into the same template and repeating that process every time you update the layout components. Instead of using a UI framework or a clunky template engine with a whole new AST to figure out the kinks of, I wanted to create a package for minimalists like me to render semantic html in chunks on the server side with optional data loading. Enter html-chunk-loader, my pet project for this purpose. You can render anything you want in the chunks themselves, whether it be web components, or any bundled code in your SSR'd script tags. 

There are 2 ways to render these chunks, either [Server Side Rendering](https://github.com/abschill/html-chunk-loader/blob/master/docs/render_lists.md) or [Static Building](https://github.com/abschill/html-chunk-loader/blob/master/docs/cli.md)

## Getting Started

Imagine we have the following files in our project


head.html
<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/head_html.png">

nav.html

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/nav_html.png">

footer.html

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/footer_html.png">


about.html
<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/about_html.png">

In our "template" file, which will be defined by the directory it's in relative to your configuration, we can use the @render-partial expression followed by the name of the partial file, all of which will reside in the respective folder. Let's take a look at an example configuration.

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/simple_code.png">


<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/about_html_render.png">


By default, the base directory is called views, the partials directory partials, and the templates directory defaults to pages. You can configure these in the constructor, but if you don't they will be set to those.


## [Configuration Documentation](https://github.com/abschill/html-chunk-loader/blob/master/docs/config.md)
## [Parsing Template Variables / Lists](https://github.com/abschill/html-chunk-loader/blob/master/docs/render_lists.md)

## [Static Site Generation](https://github.com/abschill/html-chunk-loader/blob/master/docs/cli.md)
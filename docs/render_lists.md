# Rendering Lists
<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/list_code.png?raw=true">
    
    
[Click here](https://github.com/abschill/html-chunk-loader/tree/master/examples) to see example integrations with the server

These variables match up to the @render=variable_name directives in the views/partials segments
The partials match up to the @render-partial=partial_name directives in the views/page templates

## head.html

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/head_html.png?raw=true">

## nav.html
<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/nav_html.png?raw=true">
    
home.html

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/home_html.png?raw=true">

footer.html

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/footer_html.png?raw=true">

This template takes the template, parses each partial, and outputs the following into the template from the code above

<img src="https://github.com/abschill/html-chunk-loader/tree/master/docs/img/example/home_html_render.png?raw=true">

The {_} Directive in the @for loop represents the raw array item, so it works if your array only returns values into the template. If you're working with an array of objects, you can just use {propertyName} of the iterator to put that property in that segment. 
# Reference - Chunks

```@render=<key>```
Template expression to render a value as phrasing content. It will take the value of the "key" key from your template input, and insert it into the signature's spot on the DOM.

```@loop(<key>){<content>}```
Template expression to render an array. To access object keys within the scope of the loop, wrap the property name with {}. For 1D arrays of values, such as stylesheet urls, you can key them like so:

views/partials/head.html
```
<head>
<!--other content-->
    <!--@loop(styles){
        <link rel="stylesheet" href="{_}">
    }-->
<!--other content-->
</head>    
```

```@partial```
Template expression to render a partial into a template.

module.exports = {
    "_publishDefault":"dist",
    "pathRoot":"views",
    "partials":"partials",
    "templates":"pages",
    "outDefault":"public",
    "_template_data": {
        "home":{
            "content": "Body Content", 
            "items": [ 
                "foo", "bar"
             ], 
            "items2": [ 
                { "title": "item 1", "desc": "this is item 1" }, 
                { "title": "item 2", "desc": "this is item 2" } 
            ] 
        },
        "about":{
            "content":"about page"
        }
        
  },
  "_static_config": {
    "root": "views",
    "partials": "partials",
    "templates": "pages",
    "outPath": "public",
    "loaderFile":"loader.js",
    "cleanup":true
    },
  "_partialInput": {
    "head": {
       "title": "Hello World",
       "desc": "Cool Description",
       "styles":[
            "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
       ]
   },
   "footer": {
       "title": "Hello From Footer"
   },
   "nav": {
    "navItems":[
        { label: 'foo', url: '/foo' },
        { label: 'bar', url: '/bar' }
    ],
    "navTitle":"hello world"
   }
  },
  "_custom_template_test": {
      "home":{
        "content": "Home Content",
        "items": [ "foo", "bar" ], 
        "items2": [ 
            { "title": "item 1", "desc": "this is item 1" }, 
            { "title": "item 2", "desc": "this is item 2" } 
        ]  
      },
      "about":{
        "content": "About Content"
      }
         
        
  }
}
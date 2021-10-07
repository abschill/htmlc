module.exports = {
    "_publishDefault":"dist",
    "rootDefault":"views",
    "partialDefault":"partials",
    "templateDefault":"pages",
    "outDefault":"public",
    "_template_data": {
        "content": "Body Content", 
        "items": [ 
            "foo", "bar"
         ], 
        "items2": [ 
            { "title": "item 1", "desc": "this is item 1" }, 
            { "title": "item 2", "desc": "this is item 2" } 
        ] 
  },
  "_static_config": {
    "root": "views",
    "partials": "partials",
    "templates": "pages",
    "outPath": "public",
    "loaderFile":"loader.js",
    "cleanup":true
    },
  "_partial_data": {
    "head": {
       "title": "Hello World",
       "desc": "Cool Description"
   },
   "footer": {
       "title": "Hello From Footer"
   }
  },
  "_custom_template_test": {
        "content": "Body Content", 
        "items": [ "foo", "bar" ], 
        "items2": [ 
            { "title": "item 1", "desc": "this is item 1" }, 
            { "title": "item 2", "desc": "this is item 2" } 
        ]  
  }
}
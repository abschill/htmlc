module.exports = {
    "_publishDefault": "dist",
    "pathRoot": "views",
    "partials": "partials",
    "templates": "pages",
    "outDefault": "public",
    "_template_data": {
        "home": {
            "content": "Body Content",
            "items": [
                "foo", "bar"
            ],
            "items2": [
                { "title": "item 1", "desc": "this is item 1" },
                { "title": "item 2", "desc": "this is item 2" }
            ]
        },
        "about": {
            "content": "about page"
        }
    },
    "_static_config": {
        "root": "views",
        "partials": "partials",
        "templates": "pages",
        "outPath": "public",
        "loaderFile": "loader.js",
        "cleanup": true
    }
};
//# sourceMappingURL=default.js.map
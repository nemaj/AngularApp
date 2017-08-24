// This module copies all files from cwd to dest
module.exports = {
    dev: {
        files: [
            // Main App
            {expand: true, src: "**", cwd: "app/js/controllers/", dest: "public/js/controllers/"},
            {                          src: "app/_index.prod.html", dest: "public/index.html"},
        ]
    }
}
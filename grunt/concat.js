var file_js = [
    'node_modules/angular/angular.min.js',
    'app/js/index.js',
    'app/js/main.js',
    // 'app/js/services/*',
    // 'app/js/directives/*',
]

var file_css = [
    'app/styles/app.css'
]

module.exports = {
    dev: {
        files: {
            'public/js/app.src.js': file_js,
            'public/styles/app.src.css': file_css
        }
    }
}
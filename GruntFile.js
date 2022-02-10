module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["./assets/less/"],
                    yuicompress: true
                },
                files: {
                    "./style.css": "./assets/less/style.less"
                }
            }
        },
        watch: {
            files: "./assets/less/*",
            tasks: ["less"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less']);
};
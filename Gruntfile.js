/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

path = require('path');

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            development: ['js/**/*.js']
        },
        watch: {
            options: {
                port: 35729,
                livereload: true,
                nospawn: true
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['jshint']
            },
            html: {
                files: ['bedrock/**/*.html']
            },
        },
        karma: {
            unit: {
                configFile: 'tests/unit/karma.conf.js'
            }
        },
    });

    // Update the config to only build the changed files.
    grunt.event.on('watch', function (action, filepath) {
        grunt.config(['jshint', 'development'], [filepath]);
        grunt.config(['jsonlint', 'all'], [filepath]);
    });

    // Default task(s).
    grunt.registerTask('default', ['watch']);

    // Run JS tests in Firefox using Karma test runner
    grunt.registerTask('test', ['karma']);

}
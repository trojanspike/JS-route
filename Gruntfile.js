'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [ {
                  src: "*.jade",
                  expand : true,
                  dest: "dist/",
                  ext: ".html",
                  cwd: ""
                } ]
            }
        },
        /********************/
        less: {
            development: {
                options: {
                    /* paths: ["assets/css"] */
                },
            files: {
                "dist/result.css": "*.less"
                }
            }
        },
        
        /*******************/
        
       uglify: {
            my_target: {
                options: {
                    sourceMap: 'dist/router-map.js',
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },    
              files: {
                'dist/router.min.js': 'dist/router.js'
              }
            }
        },
        
        /**/
        
        coffee : {
            compile: {
                options: {
                    bare: true,
                    flatten: true,
                },
                files: (function(){
                    return {'dev/router.js': 'dev/router.coffee'};
                })()
            }
            , dist : {
                options: {
                    bare: true,
                    sourceMap: false,
                    flatten: true,
                }
                , files: (function(){
                    return {'dist/router.js': 'dev/router.coffee'};
                })()
            }
        },
        
        /*******************/
        
        watch: {
            coffee: {
            files: ['dev/router.coffee'],
            tasks: 'coffee:compile'
            }
            /*
            ,less:{
                files : ['*.less'],
                tasks : 'less'
            }
            */
        }
        
        /*******************/
        
    });

    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-coffee");
    
    grunt.registerTask('dist', function(){
        grunt.file.recurse('dist/', function(abspath, rootdir, subdir, filename){
            grunt.file.delete('dist/'+filename)
        })
        
        grunt.task.run('coffee');
        grunt.task.run('uglify');
    });
    
    grunt.registerTask('default', [
        'watch'
    ]);
    
};
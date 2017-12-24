(function(){
    var app = angular.module('main', []);

    app.controller('MainController', [ '$http', function($http){
        var main = this;
        main.terrain_squares = [];

        $http.get(
            'http://localhost:3000/users/1/cities/1/terrains.json'
        ).then(function(response){
            data = response.data;
            main.terrain_squares = data[0]['terrain_data'];
        }, function(error){

        });
    } ]);
})();
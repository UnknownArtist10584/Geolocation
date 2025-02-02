var app = angular.module('Geolocation', ['ngAnimate', 'ui.bootstrap', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'GeolocationController'
        })

    .when('/home', {
        templateUrl: 'home.html',
        controller: 'GeolocationController'
    })

    .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutController'
    })
})

app.controller('GeolocationController', function($scope, $timeout) {

    $scope.geocoder = new google.maps.Geocoder;
    $scope.uaddress = '';
    $scope.ulocation = '';
    $scope.gotLocation = false;
    $scope.gotAddress = false;
    $scope.loading = false;

    $scope.geoProcess = function() {
        $scope.loading = true;
        console.log("geoProcess processing");

        $scope.geoLatLng();

    }

    $scope.geoLatLng = function() {
        console.log("geoLatLng processing");

        if (navigator && navigator.geolocation) {
            console.log("geolocation provider found");

            navigator.geolocation.getCurrentPosition(function(location) {

                    console.log(location.coords);

                    $scope.ulocation = location.coords.latitude + ',' + location.coords
                        .longitude;
                    $scope.gotLocation = true;
                    $scope.$apply();
                    $scope.geoAddress($scope.geocoder);
                },
                function(error) {
                    if (error.code === error.PERMISSION_DENIED) {
                        alert(
                            "Your browser denied permission to access your location. Please change this in your browser's settings."
                        )
                    }
                }
            );

        } else {
            alert("error: geolocation provider is missing");
        }

    };


    $scope.geoAddress = function(geocoder) {
        console.log("geoAddress processing");

        var ulocationdata = $scope.ulocation;
        console.log("Input string is: " + ulocationdata);

        var latlngStr = ulocationdata.split(',', 2);
        console.log("Input is split into: " + latlngStr[0] + " and " +
            latlngStr[1]);
        var latlng = {
            lat: parseFloat(latlngStr[0]),
            lng: parseFloat(latlngStr[1])
                //lat: 12.9601508,
                //lng: 77.7159555
        };

        geocoder.geocode({
            'location': latlng
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log(results[1].formatted_address);
                    $scope.uaddress = results[0].formatted_address;
                    $scope.gotAddress = true;
                    $scope.loading = false;
                    $scope.$apply();
                    console.log("Successfully wrote the address to uaddress");
                } else {
                    window.alert("No results found")
                }
            } else {
                window.alert("Geocoder failed due to " + status)
            }
        });

    }


});

app.controller('AboutController', function($scope) {
    $scope.message = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});

app.controller('NavbarController', function($scope) {
  $scope.homeClass = "navbar-brand active";
  $scope.aboutClass = "dropdown-menu"
  $scope.homeClicked = function() {
      $scope.homeClass = "navbar-brand active";
      $scope.aboutClass = "dropdown-menu";
  };
  $scope.aboutClicked = function() {
    $scope.homeClass = "navbar-brand";
    $scope.aboutClass = "dropdown-menu active";
  };
});

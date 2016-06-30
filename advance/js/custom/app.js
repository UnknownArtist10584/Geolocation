var app = angular.module('Geolocation', []);

app.controller('GeolocationController', ['$scope', function($scope) {

    $scope.geocoder = new google.maps.Geocoder;

    $scope.geoProcess = function() {
        console.log("geoProcess processing");

        $scope.geoLatLng();
    }

    $scope.geoLatLng = function() {
        console.log("geoLatLng processing");

        if (navigator && navigator.geolocation) {
            console.log("geolocation provider found");

            navigator.geolocation.getCurrentPosition(function(location) {

                console.log(location.coords);

                $scope.ulocation = location.coords.latitude + ',' + location.coords.longitude;
                $scope.geoAddress($scope.geocoder);
            });

        } else {
            alert("error: geolocation provider iscmissing");
        }

    };


    $scope.geoAddress = function(geocoder) {
        console.log("geoAddress processing");

        var ulocationdata = $scope.ulocation;
        console.log("Input string is: " + ulocationdata);

        var latlngStr = ulocationdata.split(',', 2);
        console.log("Input is split into: " + latlngStr[0] + " and " + latlngStr[1]);
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
                    $scope.addressText = "Your location is " + results[0].formatted_address;
                    console.log("Successfully wrote the address to addressText");
                } else {
                    window.alert("No results found")
                }
            } else {
                window.alert("Geocoder failed due to " + status)
            }
        });

    }


}]);

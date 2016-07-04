var app = angular.module('Geolocation', []);

app.controller('GeolocationController', function($scope) {

  $scope.geocoder = new google.maps.Geocoder;
  $scope.uaddress = '';
  $scope.ulocation = '';


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

          $scope.ulocation = location.coords.latitude + ',' + location.coords
            .longitude;
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
          $scope.uaddress = "Your location is " + results[0].formatted_address;
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

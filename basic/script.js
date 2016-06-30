var getLocation = function()
{
  if ("geolocation" in navigator)
  {

    console.log("Getting position");
    navigator.geolocation.getCurrentPosition(function(location) {
    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    document.getElementById("location-text").innerHTML = "Your latitude is: " + location.coords.latitude + " and your longitude is: " + location.coords.longitude;
});
  }
  else
  {
    alert("ERROR: GEOLOCATION NOT FOUND");
  }
}

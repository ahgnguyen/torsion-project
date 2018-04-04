var data = document.getElementById("data");
var record = document.getElementById("record");
var zero = document.getElementById("zero");
var degrees = document.getElementById("degrees");
var adjusted = 0;
var zeroAdjust = 0;
var currAlpha = 0;

if (window.DeviceOrientationEvent) {
	console.log("DeviceOrientation is supported");
 	window.addEventListener('deviceorientation', handleOrientation, true);
}
 
function handleOrientation(event) {
	// Gathers orientation data
	var alpha = event.alpha;
	var beta = event.beta;
 	var gamma = event.gamma;

 	// Displays orientation data for reference
 	document.getElementById("doDirection").innerHTML = Math.round(alpha);
 	document.getElementById("doTiltFB").innerHTML = Math.round(beta);
 	document.getElementById("doTiltLR").innerHTML = Math.round(gamma);
	document.getElementById("zeroAdjust").innerHTML = zeroAdjust;

	// Adjusts alpha value based on past zero-ing
	adjusted = Math.round(alpha - zeroAdjust);
	currAlpha = alpha;

	// Transforms value to a -180 to 180 degree scale
	if (adjusted  == 360 || adjusted == -360) {
		adjusted = 0;
	} else if (adjusted < 360 && adjusted >= 180) {
		adjusted = 360 - adjusted;
	} else if (adjusted > -180 && adjusted < 180) {
		adjusted *= -1;	
	} else if (adjusted <= -180 && adjusted > -360)  {
		adjusted = -360 - adjusted; 
	}

	// Displays and rotates the value of the angle
	degrees.innerHTML = Math.round(adjusted); 
	degrees.style.transform = "rotate(" + adjusted * -1 + "deg)";
}

// Records and displays current value
record.addEventListener("click", function() {
	data.value = adjusted;
});

// Records current value so that the value can be zero-ed
zero.addEventListener("click", function() {
	zeroAdjust = currAlpha;
});
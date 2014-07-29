var calculateButton = document.getElementById("calculateButton");
var measurementUnit;
var usersGender;
var usersAge;
var usersWeight;
var usersHeight;
var usersActivityLevel;

var weightMaintain;
var weightGain;
var weightLoss;

// This function monitors the user's preferred measurement unit
// and prompts the user to enter the correct measurement
function getMeasurementUnit() {
    var labelHeight = document.getElementById("informationLabelHeight");
    var labelWeight = document.getElementById("informationLabelWeight");

    measurementUnit = getRadioGroupValue("measurementUnit");

    // Remove statuses from labels
    labelHeight.classList.remove("statusAlert");
    labelHeight.classList.remove("statusSuccess");

    labelWeight.classList.remove("statusAlert");
    labelWeight.classList.remove("statusSuccess");

    if(measurementUnit === "imperial") {
        labelHeight.innerHTML = "<i class=\"iconInformation\"></i> Enter your height in in (21.5 to 99.2 in)";
        labelWeight.innerHTML = "<i class=\"iconInformation\"></i> Enter your weight in lb (4.7 to 1234.6 lb)";
    }

    else if(measurementUnit === "metric") {
        labelHeight.innerHTML = "<i class=\"iconInformation\"></i> Enter your height in cm (54.6 to 251 cm) ";
        labelWeight.innerHTML = "<i class=\"iconInformation\"></i> Enter your weight in kg (2.1 to 560 kg)";
    }
}

// This function returns the selected radio group value
function getRadioGroupValue(radioGroupName) {
    var radioElements = document.getElementsByName(radioGroupName);

    for(var i= 0; i<radioElements.length; i++ ) {
        if(radioElements[i].checked){
            return radioElements[i].value;
        }
    }
}

// This function checks if the input is a number
function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

// This function checks if the user input is a number that falls between two given numbers
function validateUserInput(userValue, minValue, maxValue) {
    if (isNumber(userValue)) {
        if (userValue > maxValue || userValue < minValue) {
            return false;
        }

        else {
            return true;
        }
    }

    else {
        return false;
    }
}

// This function checks if the input age is a number between 13 to 123
function validateAge(age) {
    var labelAge = document.getElementById("informationLabelAge");

    if(validateUserInput(age, 13, 123)) {
        labelAge.classList.remove("statusAlert");
        labelAge.classList.add("statusSuccess");
        labelAge.innerHTML = "<i class=\"iconSuccess\"></i> You have entered a valid age";

        return true;
    }

    else {
        labelAge.classList.remove("statusSuccess");
        labelAge.classList.add("statusAlert");
        labelAge.innerHTML = "<i class=\"iconAlert\"></i> Your age must be between 13 and 123 years old";

        return false;
    }
}

// This function checks if the input height is a number between 54.6 and 251 cm
function validateHeight(height) {
    var labelHeight = document.getElementById("informationLabelHeight");

    if(measurementUnit === "imperial") {
        height = height * 2.54;
    }

    if(validateUserInput(height, 54.6, 251)) {
        labelHeight.classList.remove("statusAlert");
        labelHeight.classList.add("statusSuccess");
        labelHeight.innerHTML = "<i class=\"iconSuccess\"></i> You have entered a valid height";

        return true;
    }

    else {
        labelHeight.classList.remove("statusSuccess");
        labelHeight.classList.add("statusAlert");

        if(measurementUnit === "metric") {
            labelHeight.innerHTML = "<i class=\"iconAlert\"></i> Your height must be between 54.6 and 251 cm";
        }

        else {
            labelHeight.innerHTML = "<i class=\"iconAlert\"></i> Your height must be between 21.5 and 99.2 in";
        }

        return false;
    }
}

// This function checks if the input weight is a number between 2.13 and 560 kg
function validateWeight(weight) {
    var labelWeight = document.getElementById("informationLabelWeight");

    if(measurementUnit === "imperial") {
        weight = weight * 0.453592;
    }

    if(validateUserInput(weight, 2.1, 560)) {
        labelWeight.classList.remove("statusAlert");
        labelWeight.classList.add("statusSuccess");
        labelWeight.innerHTML = "<i class=\"iconSuccess\"></i> You have entered a valid weight";

        return true;
    }

    else {
        labelWeight.classList.remove("statusSuccess");
        labelWeight.classList.add("statusAlert");

        if(measurementUnit === "metric") {
            labelWeight.innerHTML = "<i class=\"iconAlert\"></i> Your weight must be between 2.1 and 560 kg";
        }

        else {
            labelWeight.innerHTML = "<i class=\"iconAlert\"></i> Your weight must be between 4.7 and 1234.6 lb";
        }

        return false;
    }
}

// This function calculates the BMI of the user.
// It takes in unit in cm and kg
function BMICalculator(height, weight) {
    // Convert height from cm to m
    height = height/100;

    return (weight/(height * height)).toFixed(1);
}

// This event listener calculates the user's BMI and calorie needs,
// and display the results in the results section.
calculateButton.addEventListener('click', function() {
    // Get user's inputs
    usersGender = getRadioGroupValue("gender");
    usersAge = document.getElementById("usersAge").value;
    usersHeight = document.getElementById("usersHeight").value;
    usersWeight = document.getElementById("usersWeight").value;
    usersActivityLevel = getRadioGroupValue("activityLevel");

    if (validateAge(usersAge)) {
        if (validateHeight(usersHeight)) {
            if (validateWeight(usersWeight)) {
                if (getRadioGroupValue("measurementUnit") === "imperial") {
                    usersHeight = usersHeight * 2.54;
                    usersWeight = usersWeight * 0.453592;
                }

                document.getElementById("resultsBMI").innerHTML = BMICalculator(usersHeight, usersWeight);

                // Calculate BMR of user based on given gender and activity level
                if(usersGender === "male") {
                    weightMaintain = ((88.362 + (13.397 * usersWeight) + (4.799 * usersHeight) - (5.677 * usersAge)) * usersActivityLevel).toFixed(0);
                }

                else {
                    weightMaintain = ((447.593 + (9.247 * usersWeight) + (3.098 * usersHeight) - (4.330 * usersAge)) * usersActivityLevel).toFixed(0);
                }

                weightGain = parseInt(weightMaintain) + 500;
                weightLoss = parseInt(weightMaintain) - 500;

                // Reveal results
                document.body.style.background = "#6a94c2";
                document.getElementById("resultsSection").classList.remove("hideSection");
                document.getElementById("resultsSection").classList.add("showSection");

                // Print results
                document.getElementById("resultsMaintainWeight").innerHTML = weightMaintain.toString();
                document.getElementById("resultsLoseWeight").innerHTML = weightLoss.toString();
                document.getElementById("resultsGainWeight").innerHTML = weightGain.toString();
            }
        }
    }
}, false);

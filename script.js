// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  console.log("generatePassword");
  
  var howManyCharacters = prompt("How many characters do you want for password? (You can set between 8 ~ 128)");
  // choose a length of at least 8 characters and no more than 128 characters
  if (!(howManyCharacters >= 8 && howManyCharacters <=128)) {
    alert("Please write at least 8 characters and no more than 128 characters");
    return "Error - out of range(howManyCharacters)";
  }

  // I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
  var lowerCase = confirm("Do you want to include lowercase?");
  var upperCase = confirm("Do you want to include uppercase?");
  var numeric = confirm("Do you want to include numeric?");
  var specialCharacter = confirm("Do you want to include special characters?");

  // Validation (At aleast one type has to be selected.)
  if(!(lowerCase|upperCase|numeric|specialCharacter)){
    alert("Please Generate Password Again(Please select at least one type)");
    return "Error - need to select at least one type";
  }

  // Put the functions(user selected) in functions Array.
  var functionsArray = [];
  if (numeric) {
    functionsArray.push(randomNumber);
  }
  if (lowerCase) {
    functionsArray.push(randomLowercase);
  }
  if (upperCase) {
    functionsArray.push(randomUppercase);
  }
  if (specialCharacter) {
    functionsArray.push(randomSpecialCharacters);
  }

  // Create passwordArray using length input of the user.
  var passwordArray = [howManyCharacters];
  // Create 'value' variable to validate each character.
  var value;

  while(!((lowerCase == lowerCaseCheck) && (upperCase == upperCaseCheck) && (numeric == numericCheck) && ( specialCharacter == specialCharacterCheck))) {
    
    // if the type appears, these variables changes to true.
    var lowerCaseCheck = false; 
    var upperCaseCheck = false; 
    var numericCheck = false;
    var specialCharacterCheck = false;

    for (var i = 0; i < howManyCharacters; i++) {
      // Use the random function in functionsArray
      // Check if the value is numeric or lowercase or uppercase or specialcharacter
      value = functionsArray[Math.floor(Math.random() * functionsArray.length)]();
      if (value >= '0' && value <= '9'){
        console.log(value + " is numeric");
        numericCheck = true;
      } else if (value >= 'a' && value <= 'z') {
        console.log(value + " is lowercase");
        lowerCaseCheck = true;
      } else if (value >= 'A' && value <= 'Z') {
        console.log(value + " is uppercase");
        upperCaseCheck = true;
      } else {
        console.log(value + " is special character")
        specialCharacterCheck = true;
      }
      // After type validation, put the character in passwordArray.
      passwordArray[i] = value;
    }
    // Computer can miss types because it is producing value randomly
    // If user's selected types are not included, computer go back and generate password again.
    // what user selected
    console.log(lowerCase , upperCase , numeric , specialCharacter);
    // what computer produced
    console.log(lowerCaseCheck , upperCaseCheck , numericCheck , specialCharacterCheck);
  }
  // if all types are included, return the result
  return passwordArray.join("");
}

// get a random number
function randomNumber() {
  return Math.floor(Math.random() * 10);
}

// get a random lowercase
function randomLowercase() {
  var values="abcdefghijklmnopqrstuvwxyz";
  return values.charAt(Math.floor(Math.random() * values.length));
}

// get a random uppercase
function randomUppercase() {
  var values="abcdefghijklmnopqrstuvwxyz";
  return values.charAt(Math.floor(Math.random() * values.length)).toUpperCase();
}

// get a random specialcharacter
function randomSpecialCharacters() {
  var values="!'#$%^&*()_@{}[],.<>~()-:;";
  return values.charAt(Math.floor(Math.random() * values.length));
}
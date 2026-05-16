function hasUppercase(value) {
  for (let index = 0; index < value.length; index++) {
    const character = value[index];

    if (character >= "A" && character <= "Z") {
      return true;
    }
  }

  return false;
}

function hasLowercase(value) {
  for (let index = 0; index < value.length; index++) {
    const character = value[index];

    if (character >= "a" && character <= "z") {
      return true;
    }
  }

  return false;
}

function hasNumber(value) {
  for (let index = 0; index < value.length; index++) {
    const character = value[index];

    if (character >= "0" && character <= "9") {
      return true;
    }
  }

  return false;
}

function hasSpecialCharacter(value) {
  const allowedSymbols = "!@#$%&";

  for (let index = 0; index < value.length; index++) {
    const character = value[index];

    if (allowedSymbols.includes(character)) {
      return true;
    }
  }

  return false;
}

function checkPasswordStrength(password) {
  const missingRequirements = [];

  if (password.length < 8) {
    missingRequirements.push("minimum length is missing");
  }

  if (!hasUppercase(password)) {
    missingRequirements.push("uppercase letter is missing");
  }

  if (!hasLowercase(password)) {
    missingRequirements.push("lowercase letter is missing");
  }

  if (!hasNumber(password)) {
    missingRequirements.push("number is missing");
  }

  if (!hasSpecialCharacter(password)) {
    missingRequirements.push("special character is missing");
  }

  if (missingRequirements.length === 0) {
    return "Secure password";
  }

  return "Weak password: " + missingRequirements.join(", ");
}

console.log(checkPasswordStrength("hola123"));
console.log(checkPasswordStrength("Hola123"));
console.log(checkPasswordStrength("Hola123!"));
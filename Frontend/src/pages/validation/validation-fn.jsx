
export function validateString(text) {
  const newText = String(text || "").trim();
  return {
    newText,

    capitalize() {
      if (this.newText === "") {
        throw new Error("Text cannot be empty.");
      }
      if (this.newText[0] !== this.newText[0].toUpperCase()) {
        throw new Error("First letter must be capitalized.");
      }
      return this;
    },

    allowNumbers(allowed = false) {
      if (!allowed) {
        for (let char of this.newText) {
          if (char >= "0" && char <= "9") {
            throw new Error(`Numbers are not allowed in "${this.newText}".`);
          }
        }
      }
      return this;
    },

    minLength(length) {
      if (this.newText.length < length) {
        throw new Error(`Minimum length must be ${length} characters.`);
      }
      return this;
    },

    maxLength(length) {
      if (this.newText.length > length) {
        throw new Error(`Maximum length must be ${length} characters.`);
      }
      return this;
    },

    allowSpecialChar(allowed = false) {
      if (!allowed) {
        for (let char of this.newText) {
          const isLetter =
            (char >= "A" && char <= "Z") || (char >= "a" && char <= "z");
          const isDigit = char >= "0" && char <= "9";
          if (!isLetter && !isDigit) {
            throw new Error(
              `Special characters are not allowed in "${this.newText}".`
            );
          }
        }
      }
      return this;
    },

    emailValidation() {
      if (!this.newText.includes("@") || !this.newText.includes(".")) {
        throw new Error("Invalid email address.");
      }

      const parts = this.newText.split("@");
      if (parts.length !== 2 || parts[0] === "" || parts[1] === "") {
        throw new Error("Email must contain a local part and a domain.");
      }

      const domainParts = parts[1].split(".");
      if (domainParts.length < 2 || domainParts.some((part) => part === "")) {
        throw new Error("Email domain must be valid.");
      }

      return this;
    },

    allowedAge(minAge = 18) {
      const birthDate = new Date(this.newText);
      if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date of birth.");
      }

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < minAge) {
        throw new Error(`You must be at least ${minAge} years old.`);
      }

      return this;
    },

    passwordValidation() {
      let hasUppercase = false;
      let hasNumber = false;
      let hasSpecialChar = false;

      const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?/`~";

      for (let char of this.newText) {
        if (char >= "A" && char <= "Z") {
          hasUppercase = true;
        } else if (char >= "0" && char <= "9") {
          hasNumber = true;
        } else if (specialChars.includes(char)) {
          hasSpecialChar = true;
        }
      }

      if (!hasUppercase) {
        throw new Error("Password must contain at least one uppercase letter.");
      }
      if (!hasNumber) {
        throw new Error("Password must contain at least one number.");
      }
      if (!hasSpecialChar) {
        throw new Error(
          "Password must contain at least one special character."
        );
      }

      if (this.newText.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      return this;
    },
  };
}

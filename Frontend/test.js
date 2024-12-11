// function validateString(text) {
//   return {
//     newText: text,

//     capitalize: function () {
//       if (this.newText.length === 0) {
//         throw new Error("Text cannot be empty");
//       }
//       if (this.newText[0] !== this.newText[0].toUpperCase()) {
//         throw new Error("First letter should be capital");
//       }
//       return this;
//     },

//     allowNumbers: function (value) {
//       if (!value) {
//         this.newText.split("").forEach((element) => {
//           if (Number(element)) {
//             throw new Error("Number is Not allowed! in " + this.newText);
//           }
//         });
//       }
//       return this;
//     },

//     minLength: function (length) {
//       if (this.newText.length < length) {
//         throw new Error("Min length must be " + length);
//       }
//       return this;
//     },

//     maxLength: function (length) {
//       if (this.newText.length > length) {
//         throw new Error("Max length must be " + length);
//       }
//       return this;
//     },

//     allowSpecialChar: function (value) {
//       if (!value) {
//         this.newText.split("").forEach((element) => {
//           let ch = element.charCodeAt(0);
//           if (
//             !(ch >= 65 && ch <= 90) &&
//             !(ch >= 97 && ch <= 122) &&
//             !(ch >= 48 && ch <= 57)
//           ) {
//             throw new Error(
//               "Special cahracters not allowed in " + this.newText
//             );
//           }
//         });
//       }
//       return this;
//     },
//     // allow 0-9 , $ ,"_"
//     allowNumericalSpecial: function (value) {
//       if (!value) {
//         this.newText.split("").forEach((element) => {
//           if (
//             !(
//               (element >= "0" && element <= "9") ||
//               element == "$" ||
//               element == "_"
//             )
//           ) {
//             throw new Error("Only 0-9 allowed in " + this.newText);
//           }
//         });
//       }
//       return this;
//     },

//     emailValidation: function () {
//       if (!this.newText.includes("@") || !this.newText.includes(".")) {
//         throw new Error("Invalid email address: " + this.newText);
//       }

//       const [local, domain] = this.newText.split("@");
//       console.log(local, domain);
//       if (!local || !domain || !domain.includes(".")) {
//         throw new Error("Email must contain a valid domain.");
//       }
//       return this;
//     },

//     // age allowed is more than 10 year old taking DOB from user
//     allowedAge: function () {},

//     // alteast one special char , aleast one capital letter , 0-9 number
//     passwordValidation: function () {

//             const hasCapital = this.newText.split('').some(char => char >= 'A' && char <= 'Z');
//             const hasNumber = this.newText.split('').some(char => char >= '0' && char <= '9');
//             const hasSpecial = this.newText.split('').some(char => "!@#$%^&*()_+[]{}|;:',.<>?/`~".includes(char));

//             if (!hasCapital) {
//               throw new Error("Password must contain at least one capital letter.");
//             }
//             if (!hasSpecial) {
//               throw new Error("Password must contain at least one special character.");
//             }
//             if (!hasNumber) {
//               throw new Error("Password must contain at least one number.");
//             }

//             return this;
//           },
//     }
// }

// let name = "Vitin@gamilcom1";

// // validateString(name).minLength(5).allowNumbers(false).allowSpecialChar(false).allowNumericalSpecial();

// validateString(name).passwordValidation();

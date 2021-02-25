// Add click event listeners to buttons:
const palindromeButton = document.getElementById("palindromeButton");
palindromeButton.addEventListener("click", function () {
  checkPalindrome();
});
const longestWordButton = document.getElementById("longestWordButton");
longestWordButton.addEventListener("click", function () {
  getLongestWord();
});

function checkPalindrome() {
  let rawString = document.getElementById("textInput").value;
  let word = rawString.toLowerCase().replace(/\s/g, "");

  // Check if string is empty
  if (word.length === 0) {
    printAnswer("answer", `The string is empty.`);
    return false;
  }
  // Check is string contains only 1 ch
  if (word.length === 1) {
    printAnswer("answer", `"${rawString}" is technically a palindrome.`);
    return true;
  }

  for (i = 0; i < word.length; i++) {
    // console.log(
    //   "Forward/Backward index: " + i + " / " + (word.length - 1 - i),
    //   "    Characters: " +
    //     word.substr(i, 1) +
    //     " / " +
    //     word.substr(word.length - 1 - i, 1)
    // );

    if (i >= word.length - 1 - i) {
      printAnswer("answer", `"${rawString}" is a palindrome.`);
      return true;
    }

    if (word.substr(i, 1) !== word.substr(word.length - 1 - i, 1)) {
      printAnswer("answer", `"${rawString}" is NOT a palindrome.`);
      return false;
    }
  }
  return false;
}

function getLongestWord() {
  let rawString = document.getElementById("textInput").value;
  // Check if string is empty
  if (rawString.length === 0) {
    printAnswer("answer", `The string is empty.`);
    return false;
  }
  // Find the longest word
  let words = rawString.split(" ");
  let longestWord = "";

  words.forEach((element) => {
    if (element.length > longestWord.length) {
      longestWord = element;
    }
  });

  printAnswer("answer", `"${longestWord}" is the longest word.`);
}

function printAnswer(id, text) {
  document.getElementById(id).innerText = text;
}

// Palindrome - Easy way
// let rawString = "Murder for a jar of red rum";
// let word = rawString.toLowerCase().replace(/\s/g, "");
// let wordArr = Array.from(word);
// let reversedWord = Array.from(word).reverse().join("");

// if (word == reversedWord) {
//   console.log("Palindrome");
// } else {
//   console.log("Not Palindrome");
// }

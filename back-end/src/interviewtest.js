/* List to be indexed */
var wordlist = [
  "kitten",
  "banana",
  "kiwi",
  "aardvark",
  "apple",
  "kayak",
  "keyboard",
];

/* Sort the list */
var sortedList = wordlist.sort();

/* Header array */
var headerArray = [];

/* Go through the sorted list and push each unique first letter into an array */
for (let i = 0; i < sortedList.length; i++) {
  var word = sortedList[i];
  if (!headerArray.includes(word[0])) {
    headerArray.push(word[0]);
  }
}

/* Display the list with headers */
for (let j = 0; j < headerArray.length; j++) {
  console.log(headerArray[j].toUpperCase());
  for (let i = 0; i < sortedList.length; i++) {
    let word = sortedList[i];
    if (word[0] === headerArray[j]) {
      console.log(word);
    }
  }
}
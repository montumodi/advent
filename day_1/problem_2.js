const { list1, list2 } = require('./data');

function find_answer() {
  let score = 0;
  
  // Create a frequency map for list2 for faster lookup
  const list2Frequency = list2.reduce((freqMap, value) => {
    freqMap[value] = (freqMap[value] || 0) + 1;
    return freqMap;
  }, {});

  // Iterate through unique items in list1 and calculate the score
  const uniqueItems = new Set(list1);
  
  for (const item of uniqueItems) {
    const countInList2 = list2Frequency[item] || 0; // Get frequency of the item in list2
    score += item * countInList2;
  }

  return score;
}

console.log(find_answer());

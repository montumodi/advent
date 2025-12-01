const {list1, list2} = require('./data');

function find_answer() {
   const sortedList1 = list1.sort();
   const sortedList2 = list2.sort();
   let combinedList = 0;
    for(var i = 0; i < list1.length; i++) {
        let difference = sortedList2[i] - sortedList1[i];
        combinedList = combinedList + Math.abs(difference);
    }
    return combinedList;
}

console.log(find_answer());
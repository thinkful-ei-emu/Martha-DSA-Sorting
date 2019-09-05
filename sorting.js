function swap(array, i, j){
  const temp = array[i];
  array[i] = array[j];
  array[j]= temp;
}


function bubbleSort(array){
  let swaps = 0;
  for(let i=0; i<array.length - 1; i++){
    if(array[i]>array[i+1]){
      swap(array, i , i+1);
      swaps++;
    }
  }
  //if you had to swap then keep going if not then it's in order
  if(swaps > 0){
    return bubbleSort(array);
  }
  return array;
}

//1
/**
Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

What is the resulting list that will be sorted after 3 recursive calls to mergesort?
  split in half 3 times but starts with the lefts so...
    1.  21, 1, 26, 45, 29, 28, 2, 9                            16, 49, 39, 27, 43, 34, 46, 40

    2.  21, 1, 26, 45                      29, 28, 2, 9        16, 49, 39, 27, 43, 34, 46, 40

    3.  21, 1                 26, 45       29, 28, 2, 9        16, 49, 39, 27, 43, 34, 46, 40

What is the resulting list that will be sorted after 16 recursive calls to mergesort?
  There are 16 items in the list so after the 15th all each item will be broken down and the 16th call will 
  return the whole list broken down
    21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

What are the first 2 lists to be merged?
  [12] [1]

Which two lists would be merged on the 7th merge?
  [1, 21, 26, 45] and [2, 9, 28, 29]
 */


//2
/**
1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. 
After the first partition step has been completed, the contents of the array is in the following 
order: 3 9 1 14 17 24 22 20. Which of the following statements is correct about the partition step? Explain your answer.

  The pivot could have been 17, but could not have been 14 -> incorrect 

  The pivot could have been either 14 or 17 -> correct,
    all the numbers to the right of both numbers are greater while all the number 
    on the left are less. 

  Neither 14 nor 17 could have been the pivot -> incorrect

  The pivot could have been 14, but could not have been 17 -> incorrect


2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the 
second partitioning according to the quicksort algorithm.

  When using the last item on the list as a pivot
    1st:         pivot  
      10  3  9    12    19  14  17  16  13 15


    2nd:
        pivot
    3    9    10    12    19 14 17 16 13 15

  When using the first item on the list as a pivot
    1st:           pivot
      13 10 3 9 12  14   15 16 19 17

    2nd:         pivot
      10 3 9 12   13    14     15 16 19 17 
 */


//3
function quickSort(array, start = 0, end = array.length){
  //base case
  if(start >= end){
    return array;
  }

  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}
function partition(array, start, end){
  //pivot is the last item
  const pivot = array[end - 1];
  //j stays at start until i finds a value less than pivot
  let j = start;
  for(let i=start; i<end - 1; i++){
    //if i finds value less than pivot then sway j and that value
    //and increment j (do this for each value in array)
    if(array[i]<= pivot){
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}
//console.log(quickSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));


//4 
//dividing array 
function mergeSort(array){
  if(array.length <= 1){
    return array;
  }
  const middle = Math.floor(array.length/2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right, array);
}
//merging in order
function merge(left, right, array){
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;

  //while you have a left index and a right index
  while(leftIndex< left.length && rightIndex < right.length){
    //if already in correct order
    if(left[leftIndex] < right[rightIndex]){
      //increment is after**
      array[outputIndex++] = left[leftIndex++];
    }
    else{
      array[outputIndex++] = right[rightIndex++];
    }
  }
  //when only one side remains you add that one either on the left or
  //the right depending on which side you have
  for(let i = leftIndex; i< left.length; i++){
    array[outputIndex++] = left[i];
  }
  for(let i = rightIndex; i< right.length; i++){
    array[outputIndex++] = right[i];
  }
  return array;
}
//console.log(mergeSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

class _Node { 
  constructor(value, next){
    this.value = value; 
    this.next = next;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  insertFirst(item){
    this.head = new _Node(item, this.head);
  }

  insertLast(item){
    if(this.head === null){
      this.insertFirst(item);
    }
    else {
      //starts with the first node
      let tempNode = this.head;
      while(tempNode.next !== null){
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, beforeNode){
    if(this.head === null){
      this.insertFirst(item);
    }
    if(beforeNode === this.head){
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
  
    let targetNode = this.find(beforeNode);
    while(currNode !== targetNode){
      prevNode = currNode;
      currNode = currNode.next;
    }
    prevNode.next = new _Node(item, targetNode);
    // console.log(prevNode);
    // console.log(prevNode.next);
  }

  insertAfter(item, afterNode){
    if(this.head === null){
      this.insertFirst(item);
    }
    let currNode = this.head;
    let targetNode = this.find(afterNode);

    while(currNode !== targetNode){
      currNode = currNode.next;
    }
    currNode.next = new _Node(item, targetNode.next);
    // console.log(currNode);
    // console.log(currNode.next);
  }

  insertAt(item, location){
    if(this.head === null){
      this.insertFirst(item);
    }
    if(location === 0){
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
    for(let i=0; i<location; i++){
      prevNode = currNode;
      currNode = currNode.next;
    }
    prevNode.next = new _Node(item, currNode);
    console.log(prevNode);
    console.log(prevNode.next);
  }  

  find(item){
    //start at the head
    let currNode = this.head;
    //if the list is empty 
    if(!this.head){
      return null; 
    }
    //check for the item
    while(currNode.value !==item){
      //return ull if its the end of the list and 
      //the item is not on the list
      if(currNode.next === null){
        return null;
      }
      else{
        //otherwise keep looking
        currNode = currNode.next;
      }
    }
    //found it
    return currNode;
  }

  remove(item){
    //if the list is empty
    if(!this.head){
      return null;
    }
    //if node to remove is the head, make the next the new head
    if(this.head.value === item){
      this.head = this.head.next;
      return;
    }
    //start at the head
    let currNode = this.head;
    //previous node
    let previousNode = this.head;

    while((currNode !== null) && (currNode.value !== item)){
      //save the previous node
      previousNode = currNode; 
      currNode = currNode.next; 
    }
    if(currNode === null){
      console.log('Item not found');
      return;
    }
    //making new connection of next pointer
    previousNode.next = currNode.next;
  }
}

function main(){
  let SLL = new LinkedList;
  SLL.insertFirst('Apollo');
  SLL.insertLast('Boomer');
  SLL.insertLast('Helo');
  SLL.insertLast('Helo');
  SLL.insertLast('Husker');
  SLL.insertLast('Starbuck');
  return SLL;
}

let linkedList = main();
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}


export function getQuickSortAnimations(array){
    /*const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length -1, auxiliaryArray, animations);
    */



  }

  function quickSortHelper(
    mainArray,
    startIdx, // left
    endIdx, // right
    auxiliaryArray,
    animations,
  ){
    var l = startIdx;
    var r = endIdx - 1;
    var size = endIdx - startIdx; // getting the size

    if(size > 1){
      var pivot = mainArray[Math.floor(Math.random() % size + l)];
      while(l < r){
        while(mainArray[r] > pivot && r > l){
          r--;
        }
        while(mainArray[l] < pivot && l <= r)
        {
          l++;
        }
        if(l < r){
          swap(mainArray[l], mainArray[r]);
          l++;
        }
        if(l < r){
          swap(mainArray[l], mainArray[r]);
          l++;
        }
      }
      quickSortHelper(mainArray, startIdx, l);
      quickSortHelper(mainArray, r, right);
    }
    //if(startIdx === endIdx) return; // If we have same index, that means only one array, return the function
    //const middleIdx = Math.floor((startIdx + endIdx) / 2); // Our pivot

    //quickSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    //quickSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

  }


function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

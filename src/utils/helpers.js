// export const getArrSlider = (arr, windowSize) => {
//   let index = 0;

//   const intervalId = setInterval(() => {
//     let selectedArr = [];
//     for (let i = 0; i < windowSize; i++) {
//       selectedArr.push(arr[(index + i) % arr.length]);
//     }
//     index = (index + 1) % arr.length;
//     console.log(selectedArr);
//   }, 1000);

//   return intervalId;
// };

export const getArrSlider = (start, end, arrLength) => {
  const limit = start > end ? arrLength : end;

  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }

  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};
// const newArr = [0, 1, 2, 3, 4, 5, 6, 7];
// funcA(newArr, 4);

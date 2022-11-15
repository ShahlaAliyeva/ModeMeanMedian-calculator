const inputFields = document.querySelector(".input-fields");
const inputValue = document.querySelectorAll(".input-fields input");
const btn = document.querySelector(".btn-calc");
const responseDiv = document.querySelector(".calc-response");

function newDiv(label, value) {
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.textContent = label;
  let p = document.createElement("p");
  p.textContent = value;

  div.appendChild(h3);
  div.appendChild(p);
  responseDiv.appendChild(div);
}

const valueArr = [];
btn.addEventListener("click", (e) => {
  e.preventDefault();
  inputValue.forEach((input) => {
    console.log(input.value);
    valueArr.push(+input.value);
    input.value = "";
  });
  console.log(meanMedianMode(valueArr));
  console.log(valueArr);

  var xValues = valueArr;
  var yValues = valueArr;
  console.log("yValues "+ yValues);
  var barColors = ["red", "green", "blue", "orange", "brown"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Array Elements",
      },
    },
  });
});

function meanMedianMode(array) {
  return {
    mean: getMean(array),
    median: getMedian(array),
    array: array,
    mode: getMode(array),
  };
}

function getMean(array) {
  let sum = 0;

  array.forEach((num) => {
    sum += num;
  });

  let mean = sum / array.length;
  newDiv("mean", mean);

  return mean;
}

function getMedian(array) {
  array.sort(function (a, b) {
    return a - b;
  });
  let median;

  if (array.length % 2 !== 0) {
    median = array[Math.floor(array.length / 2)];
    newDiv("median", median);
  } else {
    let mid1 = array[array.length / 2 - 1];
    let mid2 = array[array.length / 2];
    median = (mid1 + mid2) / 2;
    newDiv("median", median);
  }
  return median;
}

function getMode() {
    let arr = valueArr
    arr.sort()
    const arrObj = {}

    let result = []
        max = 0

    arr.forEach((element) => {
        console.log(arrObj[element])
        if(!arrObj[element]){
            arrObj[element] = 0
        }
        arrObj[element]++
    })

    for(let key in arrObj) {
        if(arrObj[key] > max) {
            result = [key]
            max = arrObj[key]
        } else if (arrObj[key] == max) {
            result.push(key)
        }
    }

    if(Object.keys(arrObj).length === result.length) {
        result = []
    }

    console.log('En cox tekrarlanan element: ', parseInt(result))
    console.log(arrObj)
    newDiv("mode", result);

    
}
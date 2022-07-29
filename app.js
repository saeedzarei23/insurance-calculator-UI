// vareiabel and selection
// we select the select box that we made
const yearOption = document.querySelector("#year"),
  // form that we made
  form = document.querySelector("#clac");
  const kholase = document.querySelector("#kholase");
const calcBtn= document.querySelector('#btn')
const resultBox = document.querySelector("#information");

// eventlistner
document.addEventListener("DOMContentLoaded", dateMaker);

// form eventlisnert for we it submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // we select the year
  const year = document.querySelector("#year").value;
  // we select the car option
  const car = document.querySelector("#car").value;
  // we are looking for when our radio button will be cheacked
  const kind = document.querySelector('input[name="level"]:checked').value;
  const clientInsurece = new InsranceCheaker(car, year, kind);
  const price = clientInsurece.clacprice(clientInsurece);
  // printing the result into Dom
  showResult(price, clientInsurece);
});

// function
function dateMaker() {
  // we make loop to loop into our year and decrease it by one
  for (let i = 20; i >= 0; i--) {
    // we decrease it by one here
    const year = new Date().getFullYear() - [i];
    //   shamsi year Formula
    const shamsiYear = year - 621;
    //   we make option for our drop box
    let shamsioption = document.createElement("option");
    //   we set Attribute for our option value
    // vlaue is the yaer
    shamsioption.setAttribute("value", `${shamsiYear}`);
    // wwe set the inner text to the  shamsiYear
    shamsioption.innerText = shamsiYear;
    yearOption.appendChild(shamsioption);
  }
}
// we are making constructor for each of option the car
function InsranceCheaker(car, year, kind) {
  this.car = car;
  this.year = year;
  this.kind = kind;
}
// we are making prototype for our constructor
// this function will calculat the diffrent price of
// Insrance for our car
InsranceCheaker.prototype.clacprice = function (InsranceCheaker) {
  // this variabel is for our price
  let price;
  // this is the base price for our Insrance
  const base = 5000;
  // get model of the car
  const car = InsranceCheaker.car;
  /*
    1 if its bmw 20%
    2 if its porsche 30%
    3 if its benz 25%
  */

  // this switch statmant change price base on
  //the type of the car
  switch (car) {
    case "BMW i8":
    case "BMW":
      price = base * 1.2;
      break;
    case "porsche taycan":
    case "porsche":
      price = base * 1.3;
      break;
    case "benz s500":
    case "benz":
      price = base * 1.25;
      break;
    default:
      price = base;
  }
  // get the year of car
  const year = InsranceCheaker.year;
  // we are calculat diffrence betwen now and the year that we chose
  const diffrentyear = this.getyearDifference(year);
  // each year the cost of Insrance will bw 3% cheaper
  price = price - (diffrentyear * 3 * price) / 100;
  // checking the kind of Insrance if it's basic or compleat
  const kind = InsranceCheaker.kind;
  // price will be change base on the kind of Insrance
  price = this.clacKind(price, kind);
  // we return the price so we can use it
  return price;
};
// this prototype calculat diffrence betwen now and the year that we chose
InsranceCheaker.prototype.getyearDifference = function (year) {
  // we decrease it by one here
  const newyear = new Date().getFullYear();
  //   shamsi year Formula
  const shamsiYear = newyear - 621;

  return shamsiYear - year;
};
// in this function we are cheacking what kind of the Insrance
// we are chosing
InsranceCheaker.prototype.clacKind = function (price, kind) {
  /*
  the basic insurnce going to incease the value by 20%
  the compleat insurnce going to incease the value by 35%
  */
  if (kind === "ساده") {
    price = price * 1.3;
  } else {
    price = price * 1.5;
  }
  return price;
};

// showing the result
function showResult(price, clientInsurece) {
  // we are selecthing elemant that we need
  let car = clientInsurece.car;
  let price1 = price;
  // we are selecting the looding img and seting the style to block
  const spinner = document.querySelector(".lode img");
  spinner.style.display = "block";
  // we are makeing settimeout function
  // that  show our result and removing the spinner
  setTimeout( ()=> {
    spinner.style.display = "none";
    resultBox.classList.add("show");
    resultBox.innerHTML = `<p id="carname">مدل ماشین : ${car}</p>
  <p id="year">سال ساخت : ${clientInsurece.year}</p>
  <p id="kind">نوع بیمه : ${clientInsurece.kind}</p>
  <p id="final-price"> قیمت نهایی : ${'$'}${price1}</p>`;
    kholase.appendChild(resultBox);
  }, 3000);
}
// this eventlisnet help us remove the result box when we already use the clac before hand
calcBtn.addEventListener('click',()=>{
  if(resultBox.innerHTML="")return
  resultBox.classList.remove("show");
  resultBox.reset() 
})
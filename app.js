// we select the select box that we made
const yearOption = document.querySelector("#year");
// we make loop to loop into our year and decrease it by one
for (let i = 13; i > 0; i--) {
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

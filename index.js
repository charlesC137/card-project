let hasInputDetails = false;
switchScreen();

function switchScreen(){
  if(!hasInputDetails){
    document.getElementById('input-section')
      .innerHTML = `
      <p>cardholder name</p>
      <input id="name" placeholder="e.g Jane Appleseed">
      <p>card number</p>
      <input id="card-number" placeholder="e.g 1234 5678 9012 3456">
      <div id="input-grid">
        <div>
          <p>exp.date(mm/yy)</p>
          <input id="exp-month" placeholder="MM">
          <input id="exp-year" placeholder="YY">
        </div>
        <div>
          <p>cvc</p>
          <input id="cvc" placeholder="e.g 123">
        </div>
      </div>
      <button id="confirm-btn">
        Confirm
      </button>

      <p class="error"></p>  
    `;

    firstPage();
  } else {
    document.getElementById('input-section')
      .innerHTML = `
      <div id="post-add">
      <img src="./images/icon-complete.svg">
      <h2>
        Thank You!
      </h2>
      <p class="add-notification">
        We've added your card details.
      </p>
      <button>
        Continue
      </button>
    </div>
    `;

    secondPage();
  }
}

function firstPage(){
  const cardNumber = document.getElementById('card-number');
  const cardName = document.getElementById('name');
  const expMonth = document.getElementById('exp-month')
  const expYear = document.getElementById('exp-year');
  const cvc = document.getElementById('cvc');
  const confirmBtn = document.getElementById('confirm-btn');
  const cvcDisplay = document.querySelector('.cvc');
  const cardNumberDisplay = document.querySelector('.card-number');
  const nameDisplay = document.querySelector('.name');
  const expDateDisplay = document.querySelector('.exp-date');
  let number;
  let month;
  let year;

  function regexTest(){
    const nameRegex = /^([a-z][^\d]+)([ ])([a-z][^\d]+)$/gi;
    const nameTest = nameRegex.test(cardName.value);
  
    const adjustNumber = /[ ]/g;
    const numberRegex = /^[0-9]{16}$/g;
    const moddedNumber = cardNumber.value.replaceAll(adjustNumber, '');
    number = moddedNumber;
    const numberTest = numberRegex.test(moddedNumber);
    
    const cvcRegex = /^[0-9]{3}$/g;
    const cvcTest = cvcRegex.test(cvc.value);
  
    const expMonthRegex = /^[0-9]{1,2}$/g;
    let expMonthTest = expMonthRegex.test(expMonth.value);
    if(parseInt(expMonth.value) <= 0 || parseInt(expMonth.value) > 12){
      expMonthTest = false;
    }
  
    const expYearRegex = /^[0-9]{1,2}$/g;
    let expYearTest = expYearRegex.test(expYear.value);
    if(parseInt(expYear.value) <= 0 || parseInt(expYear.value) > 99){
      expYearTest = false;
    }
  
    if(nameTest && numberTest &&
       cvcTest && expMonthTest && expYearTest   
    ){
      month = expMonth.value;
      year = expYear.value;
      return true;
    } else{
      return false;
    }
  }
  
  function updateCards(){
    regexTest();
    if(regexTest()){
      modifyContent();
      cvcDisplay.textContent = cvc.value ;
      cardNumberDisplay.textContent = number;
      nameDisplay.textContent = cardName.value; 
      expDateDisplay.textContent = `
        ${month}/${year}
      `;
      hasInputDetails = true;
      switchScreen();
    } else {
      document.querySelector('.error')
        .textContent = 'Invalid Format! Please re-enter your details.'
    }
  
    cvc.value = '';
    cardNumber.value = '';
    cardName.value = '';
    expMonth.value = '';
    expYear.value = '';
  }
  
  function modifyContent(){
    if(parseInt(month) < 10 && month.length === 1){
      month = `0${month}`
    }
  
    if(parseInt(year) < 10 && year.length === 1){
      year = `0${year}`
    }
  
    console.log(month, year);
  
    number = number.split('');
    for(let i = 4; i < 15; i += 5){
      number.splice(i, 0, ' ');
    }
    number = number.join('');
  }
 
  confirmBtn.addEventListener('click', updateCards);

}

function secondPage(){
  document.querySelector('button')
    .addEventListener('click', () => {
      hasInputDetails = false;
      switchScreen();
    })
}
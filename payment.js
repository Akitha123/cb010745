let tColorA = document.getElementById('tcolorA'),
tColorB = document.getElementById(tColorB),
tColorC = document.getElementById(tColorC),
iconA = document.querySelector('.fa-credit-card'),
iconB = document.querySelector('.fa-building-columns'),
iconC = document.querySelector('.fa-wallet'),
cDetsails = document.querySelector('.card-details');


function dofun(){
    tColorA.style.color = "greenyellow";
    tColorB.style.color = "#444";
    tColorC.style.color = "#444";
    iconA.style.color = "greenyellow";
    iconB.style.color = "#aaa";
    iconC.style.color = "#aaa";
    cDetsails.style.display = "block";
}

function dofunA(){
    tColorA.style.color = "#444";
    tColorB.style.color = "#greenyellow";
    tColorC.style.color = "#444";
    iconA.style.color = "#aaa";
    iconB.style.color = "greenyellow";
    iconC.style.color = "#aaa";
    cDetsails.style.display = "none";
}

function dofunB(){
    tColorA.style.color = "#444";
    tColorB.style.color = "#444";
    tColorC.style.color = "greenyellow";
    iconA.style.color = "#aaa";
    iconB.style.color = "#aaa";
    iconC.style.color = "greenyellow";
    cDetsails.style.display = "none";
}
let cNumber = document.getElementById('number');
cNumber.addEventListener('keyup',function(e){
    let num = cNumber.value;
    let newValue = '';
    num = num.replace(/\s/g,'');
    for(var i = 0;i < num.length; i++){
        if(i%4 == 0 && i > 0) newValue = newValue.concat(' ');
        newValue = newValue.concat(num[i]);
        cNumber.value = newValue;
    }
    let ccNum = document.getElementById('c-number');
    if(num.length<16){
        ccNum.style.border = "1px solid red";
    }else{
        ccNum.style.border = "1px solid greenyellow";
    }
});

 let eDate = document.getElementById('e-date');
 eDate.addEventListener('keyup',function(e){

    let newInput = eDate.value;

    if(e.which !== 8){
        var numChars = e.target.value.length;
        if(numChars == 2){
            var thisVal = e.target.value;
            thisVal += '/';
            e.target.value = thisVal;
            console.log(thisVal.length)
        }
    }

    if(newInput.length<5){
        eDate.style.border = "1px solid red";
    }else{
        eDate.style.border = "1px solid greenyellow";
    }
 });

 window.onload = function() {
    const name = localStorage.getItem('fullName');
    const date = localStorage.getItem('selectedDate');
    const time = localStorage.getItem('selectedTimeSlots');
    const duration = localStorage.getItem('duration');
    const mobile = localStorage.getItem('mobileNumber');
    const email = localStorage.getItem('email');
    const gender = localStorage.getItem('gender');
    const chargesSLAdult = localStorage.getItem('charges-SL-Adult');
    const chargesSLChild = localStorage.getItem('charges-SL-Child');
    const chargesForeignerAdult = localStorage.getItem('charges-Foreigner-Adult');
    const chargesForeignerChild = localStorage.getItem('charges-Foreigner-Child');
    const SLAdult = localStorage.getItem('SL-Adult');
    const SLChild = localStorage.getItem('SL-Child');
    const ForeignerAdult = localStorage.getItem('Foreigner-Adult');
    const ForeignerChild = localStorage.getItem('Foreigner-Child');
    const totalAmountPayable = localStorage.getItem('total-amount-payable');
    const infant = localStorage.getItem('Infant');
    

    document.getElementById('name').textContent = name;
    document.getElementById('date').textContent = date;
    document.getElementById('time').textContent = time;
    document.getElementById('duration').textContent = duration;
    document.getElementById('mobile').textContent = mobile;
    document.getElementById('email').textContent = email;
    document.getElementById('gender').textContent = gender;
    document.getElementById('no-sladult').textContent = SLAdult;
    document.getElementById('no-slchild').textContent = SLChild;
    document.getElementById('no-fadult').textContent = ForeignerAdult;
    document.getElementById('no-fchild').textContent = ForeignerChild;
    document.getElementById('charges-SL-Adult').textContent = chargesSLAdult;
    document.getElementById('charges-SL-Child').textContent = chargesSLChild;
    document.getElementById('charges-Foreigner-Adult').textContent = chargesForeignerAdult;
    document.getElementById('charges-Foreigner-Child').textContent = chargesForeignerChild;
    document.getElementById('infant').textContent = infant;
    document.getElementById('total-amount').textContent = totalAmountPayable;
}

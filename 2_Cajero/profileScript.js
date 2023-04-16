var parameters = new URLSearchParams(location.search);

var name = parameters.get('name');
var balance = parameters.get('balance');
var number = parameters.get('number');


window.onload = function () {
    var label = document.getElementById("infoFullname");
    label.innerHTML = name;
    var label1 = document.getElementById("infoNumberAccount");
    label1.innerHTML = number;
    var label2 = document.getElementById("infoBalance");
    label2.innerHTML = balance;
}


document.getElementById("enterAmountBtn").addEventListener("click", function () {
    event.preventDefault();
    var sumValue = parseInt(document.getElementById('amount').value);
    var balanceT = document.getElementById('infoBalance');
    var sumUpdate = parseInt(balanceT.textContent) + sumValue
    if (sumUpdate < 991)
        balanceT.innerHTML = sumUpdate;
    else
        alert("Valor maximo permitido 990");
})

document.getElementById("withdrawalAmountBtn").addEventListener("click", function () {
    event.preventDefault();
    var lessValue = parseInt(document.getElementById('amount').value);
    var balanceT = document.getElementById("infoBalance");
    var lessUpdate = parseInt(balanceT.textContent) - lessValue
    if (lessUpdate > 9)
        balanceT.innerHTML = lessUpdate;
    else
        alert("Valor minimo permitido es 10");
})






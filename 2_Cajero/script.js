

var accountsInfo = [
  { name: "Mali Becerri", balance: 200, number: 60755912778, pwd: 1234 },
  { name: "Gera Rodriguez", balance: 290, number: 60765912778, pwd: 5678 },
  { name: "Maui Stan", balance: 67, number: 60775912778, pwd: 9012 }
]

var name= "";
var amount=0;


document.getElementById("validateBtn").addEventListener("click", function () {
  event.preventDefault();
  var label1 = parseInt(document.getElementById('account').value)
  var label2 = parseInt(document.getElementById('password').value)
  var control= false

  for (var i = 0; i < accountsInfo.length; i++) {
    if (accountsInfo[i].number === label1 && accountsInfo[i].pwd === label2) {
      control=true;
      window.location.href = "Profile.html?name="+accountsInfo[i].name+"&balance="+accountsInfo[i].balance+"&number="+accountsInfo[i].number;
      break;
    }
  }

  if (control==false){
    alert("Datos de acceso no válidos, intentelo de nuevo");
  }
})



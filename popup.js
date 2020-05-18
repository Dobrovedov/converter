var Dollar; 

function calculate(e) {
  var result = document.getElementById("result");
  if (e.keyCode == 13){//если код клавиши enter
	var v = document.getElementById("expression").value.trim();	//обрезаем пробеллы
	var ex = new Expression("");	
		
	if (v != ""){//проверяем текст на постоту
		try
        {
            v = "(" + v + ")*" + Dollar;// add a dollar to any operation
		    ex.Expression(v);//устанавливаем введеный текст в объект библиотек
			result.innerText = "= " + ex.Evaluate();//выводимый результат число и равно
		 }
		catch(e){
			result.innerText = "= Error"
		}
	}
  }
  else result.innerText = "";
}

document.addEventListener('DOMContentLoaded', function () { 
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;// check for the existence of the XMLHttpRequest class, if not, then use the XDomainRequest class (for old IE)
    var xhr = new XHR(); //instantiation
    xhr.open('GET', 'https://api.tinkoff.ru/v1/currency_rates', true); // we refer to the link with the API
    xhr.onload = function () {  //download function description
        var json = JSON.parse(this.responseText); // Parsing json data into json object
        if (json.resultCode == 'OK') { //checks for elements
            var rates = json.payload.rates; //unloaded a variable from an object
            for (var i in rates) { // in each element of the array takes an object and checks it for a value.
                if (rates[i].category == 'DebitCardsTransfers') {
                    if (rates[i].toCurrency.code == 643 && rates[i].fromCurrency.code == 840) {
                        Dollar = rates[i].sell;
                    }
                }
            }
        }
    } //if everything is correct, then we take the value sell
    xhr.send();

document.addEventListener('DOMContentLoaded', function() { 

    var expr = document.getElementById('expression'); //загрузка нашего окошка
	expr.addEventListener('keyup', calculate);//при вводе каждой кнопки запускается функция калькулятора
});
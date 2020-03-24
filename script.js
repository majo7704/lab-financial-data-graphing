let ctx = document.getElementById('myChart').getContext("2d")
// const coinAPI = axios.create({
//   baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
// })
let fromDate = document.getElementsByClassName('fromInput')[0].value;
let toDate = document.getElementsByClassName('toInput')[0].value;
let pElement = document.getElementsByTagName('p')

// let currency = 'USD'

let getCurrency = function() {
  return document.getElementsByTagName("select")[0].value
}
function currencyLoad() {
  let getAllCurrencies = Object.keys(currencies)
  let selectField = document.getElementsByTagName('select')[0]
  for (let i =0; i < getAllCurrencies.length; i ++){

  let optionField = document.createElement('option')
  optionField.setAttribute('value', getAllCurrencies[i])
  optionField.innerHTML = getAllCurrencies[i];
  selectField.appendChild(optionField)
}
}
currencyLoad()

function draw(fromDate, toDate, currency){
  
 axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${getCurrency()}`)
   .then(response => {
    let price = Object.values(response.data.bpi)
    let date = Object.keys(response.data.bpi)
    
    let maxField = document.getElementsByClassName('max')[0]
    let maxValue = Math.max(...price);
    maxField.textContent = maxValue + `${getCurrency()}`;
    console.log(maxValue)
    
    let minField = document.getElementsByClassName('min')[0]
    let minValue = Math.min(...price);
    minField.textContent = minValue + `${getCurrency()}`;
    
    document.getElementsByClassName('fromInput')[0].onchange = function (event) {
      console.log(event)
      fromDate = event.target.value
      draw(fromDate, toDate, currency)
    }
    document.getElementsByClassName('toInput')[0].onchange = function (event) {
      console.log(event)
      let toDate = event.target.value
      draw(fromDate, toDate, currency)
    }
    document.getElementById('currency').onchange = function (event) {
      let currency = event.target.value
      draw(fromDate, toDate, currency)
    }

     let myChart = new Chart(ctx, {
       type: 'line',
       data: {
         labels: date,
         datasets: [{
           label: 'Coin graph',
           data: price,
           backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgba(153, 102, 255, 0.2)',
             'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
             'rgba(255, 99, 132, 1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
         }]
       },
       options: {
         responsive: true,
         scales: {
           yAxes: [{
             price: {
               beginAtZero: true
             }
           }]
         }
       }
     });
    
     console.log(response.data.bpi);
   })
     .catch(error => {
       console.log(error)
     })

    }

draw(fromDate, toDate, getCurrency())


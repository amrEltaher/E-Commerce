
$(document).ready(function () {
  let sellersData = JSON.parse(localStorage.getItem('sellers'));

  let labels = Object.keys(sellersData); // Ids
  let productCounts = labels.map(label => sellersData[label].Products.length); // Number of products for each seller

  let salesData = {
    labels,
    datasets: [{
      label: 'Number of Products',
      data: [...productCounts, 20],
      backgroundColor: '#ff9f43',
      borderColor: '#ff9f43',
      borderWidth: 4
    }]
  };


  let ctx = $('#top_chart_canvas').get(0).getContext('2d'); // return CanvasRenderingContext2D 
  console.log(ctx)

  let topChart = new Chart(ctx, {
    type: 'line',//bar
    data: salesData,
    options: {
      maintainAspectRatio: false
    }
  });
});

function updateChartFromLocalStorage(chart) {
  let salesDataString = localStorage.getItem('salesData');
  if (!salesDataString) {
    console.error('No sales data found in local storage');
    return;
  }
  let salesData = JSON.parse(salesDataString);

  // Assuming salesData is in the format { labels: [], datasets: [{ data: [] }] }
  chart.data.labels = salesData.labels;
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data = salesData.datasets[i].data;
  });

  chart.update();
}

$(document).ready(function () {
  
let salesData = {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  datasets: [{
    data: [90000, 120000, 150000, 180000, 210000, 240000, 270000]
  }]
};

localStorage.setItem('salesData', JSON.stringify(salesData));

  let ctx = $('#top_chart_canvas').get(0).getContext('2d');
  let topChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],  
      datasets: [{
        label: 'Total Sales',
        data: [], 
        fill: true,
        borderColor: '#feeded',
        tension: 0.1,
        maintainAspectRatio: false
      }]
    },
    options: {}
  });
  updateChartFromLocalStorage(topChart);
});

function updateChartFromLocalStorage(chart) {
  // Retrieve data from local storage
  const salesDataString = localStorage.getItem('salesData');
  if (!salesDataString) {
    console.error('No sales data found in local storage');
    return;
  }

  // Parse the data
  const salesData = JSON.parse(salesDataString);

  // Assuming salesData is in the format { labels: [], datasets: [{ data: [] }] }
  chart.data.labels = salesData.labels;
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data = salesData.datasets[i].data;
  });

  // Update the chart
  chart.update();
}

// Initialize the chart
$(document).ready(function () {
  // Example of how the data might be structured in local storage
const salesData = {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  datasets: [{
    data: [90000, 120000, 150000, 180000, 210000, 240000, 270000]
  }]
};

localStorage.setItem('salesData', JSON.stringify(salesData));

  const ctx = $('#top_chart_canvas').get(0).getContext('2d');
  const topChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // initially empty
      datasets: [{
        label: 'Total Sales',
        data: [], // initially empty
        fill: true,
        borderColor: '#feeded',
        tension: 0.1,
        maintainAspectRatio: false
      }]
    },
    options: {}
  });

  // Update the chart with data from local storage
  updateChartFromLocalStorage(topChart);
});

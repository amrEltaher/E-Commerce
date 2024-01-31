
$(document).ready(function() {
  $('.counters').each(function() {
    $(this).text('0');

    const updateCounter = () => {
      const target = parseInt($(this).attr('data-count'));
      const count = parseInt($(this).text());
      const increment = target / 500; // smaller increment for slower counting

      if (count < target) {
        $(this).text(Math.ceil(count + increment));
        setTimeout(updateCounter, 10); // increased timeout for slower updates
      } else {
        $(this).text(target);
      }
    };

    updateCounter();
    $('.counters').eq(0).attr('data-count', '30000');  // Total Income
    $('.counters').eq(1).attr('data-count', '200');  // Users
    $('.counters').eq(2).attr('data-count', '10');  // Seller
    $('.counters').eq(3).attr('data-count', '300');  // New Order

  });
});
















//   // Assuming you have data for total sales for each year
//   $(document).ready(function () {
//   const salesData = {
//     labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
//     datasets: [{
//       label: 'Total Sales',
//       data: [90000, 120000, 150000, 180000, 210000, 240000, 270000],
//       fill: true,
//       borderColor: '#feeded',
//       tension: 0.1
//     }]
//   };

//   const config = {
//     type: 'line',
//     data: salesData,
//     options: {}
//   };

//   const ctx = $('#top_chart_canvas').get(0).getContext('2d');
//   const topChart = new Chart(ctx, config);
// });
  

const ctx = document.getElementById('chart').getContext('2d');

const trainers = ['Mattheos', 'David', 'Faust', 'Johnson', 'Andrew', 'Roy', 'Karen', 'Samantha', 'Jamal', 'Louciana'];
const actualData = [0, 0, 0.77, 1.08, 1.36, 12.52, 22.48, 27.11, 30.32, 45.75];
let expected = 110;

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: trainers,
    datasets: [
      {
        label: 'Actual Rev/Hr',
        data: actualData,
        backgroundColor: actualData.map(val => val < 5 ? '#f87171' : '#86efac'),
        borderColor: '#4ade80',
        borderWidth: 1
      },
      {
        label: 'Expected Rev/Hr',
        data: new Array(trainers.length).fill(expected),
        type: 'line',
        borderColor: '#fbbf24',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Revenue per Hour ($)' }
      },
      x: {
        title: { display: true, text: 'Trainer' }
      }
    }
  }
});

function updateExpected() {
  const clients = parseInt(document.getElementById('clients').value);
  const tier = parseFloat(document.getElementById('tier').value);
  const sessionsPerMonth = { 1760: 16, 1440: 12, 1040: 8, 600: 4 };
  const hours = sessionsPerMonth[tier] * clients;
  const calculated = (tier * clients) / hours;
  expected = parseFloat(calculated.toFixed(2));
  document.getElementById('expectedRev').textContent = expected.toFixed(2);
  chart.data.datasets[1].data = new Array(trainers.length).fill(expected);
  chart.update();
}

document.getElementById('clients').addEventListener('input', updateExpected);
document.getElementById('tier').addEventListener('change', updateExpected);

export function calendar(id, year, month) {
  const six = 6;
  const seven = 7;
  let dayLast = new Date(year, month + 1, 0).getDate(),
    dateLast = new Date(year, month, dayLast),
    weekDayLast = new Date(
      dateLast.getFullYear(),
      dateLast.getMonth(),
      dayLast
    ).getDay(),
    weekDayFirst = new Date(
      dateLast.getFullYear(),
      dateLast.getMonth(),
      1
    ).getDay(),
    calendar = '<tr>',
    monthArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

  if (weekDayFirst !== 0) {
    for (let i = 1; i < weekDayFirst; i++) {
      calendar += '<td>';
    }
  } else {
    for (let i = 0; i < six; i++) {
      calendar += '<td>';
    }
  }

  for (let i = 1; i <= dayLast; i++) {
    if (
      i === new Date().getDate() &&
      dateLast.getFullYear() === new Date().getFullYear() &&
      dateLast.getMonth() === new Date().getMonth()
    ) {
      calendar += '<td class="today">' + i;
    } else {
      calendar += '<td>' + i;
    }

    if (
      new Date(dateLast.getFullYear(), dateLast.getMonth(), i).getDay() === 0
    ) {
      calendar += '<tr>';
    }
  }

  for (let i = weekDayLast; i < seven; i++) {
    calendar += '<td>';
  }

  document.querySelector('#' + id + ' tbody').innerHTML = calendar;
  const monthYear = document.getElementById('monthYear');
  monthYear.innerHTML =
    monthArr[dateLast.getMonth()] + ' ' + dateLast.getFullYear();
  monthYear.dataset.month = dateLast.getMonth();
  monthYear.dataset.year = dateLast.getFullYear();

  if (document.querySelectorAll('#' + id + ' tbody tr').length < six) {
    document.querySelector('#' + id + ' tbody').innerHTML +=
      '<tr><td> <td> <td> <td> <td> <td> <td> ';
  }
}

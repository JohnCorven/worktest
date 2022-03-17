// Задание 1
function task_one() {
  let a = 1,
    b = 1,
    c,
    d;
  c = ++a; // инкрементирует "a" и присваивает "a" переменной "с" (a = 2, c = 2)
  console.log(c); // ответ: 2
  //пример 2
  d = b++; // присваивает "b" переменной "d" и инкрементирует "b" (b = 2, d = 1)
  console.log(d); //ответ: 1
  //пример 3
  c = 2 + ++a; // инкрементирует "a" складывает с числом "2" и присваивает переменной "с" (a = 3, c = 5)
  console.log(c); //ответ: 5
  //пример 4
  d = 2 + b++; // складывает "b" с числом "2" присваивает переменной "d" и инкрементирует "b" (b = 3, d = 4)
  console.log(d); //ответ: 4
  console.log(a, b, c, d); // 3 3 4 5
}

// Задание 2
function task_two() {
  let a = 2; // присваивает значение "2" переменной "a"
  let x = 1 + (a *= 2); // умножает значение "a" на число "2", складывает полученное число "4" с числом "1" и присваивает переменной "x"
  console.log(a, x); // 4 5
}

//Задание 3
/**
 * Функция создаёт два разных рандомных числа от -9 до 9 и выводит в консоль разность, сумму или произведение этих чисел.
 * Если оба числа положительные, то разность.
 * Если оба числа отрицательные, то произведение.
 * Если знаки разные, то сумму.
 * @var {number} a - первое рандомное число, определяемое автоматически.
 * @var {number} b - второе рандомное число, определяемое автоматически.
 * @returns {number} - возвращает число согласно условию.
 */
function task_three() {
  let a = Math.round(Math.random() * 10 * ((Math.random() - 0.5) * 2)); // присваивает рандомное число от -9 до 9
  let b = Math.round(Math.random() * 10 * ((Math.random() - 0.5) * 2)); // аналогично, так интересней просто)
  if (a >= 0 && b >= 0) {
    console.log(a - b);
  } else if (a < 0 && b < 0) {
    console.log(a * b);
  } else {
    console.log(a + b);
  }
}

//Задание 4
/**
 * функция сложения двух чисел
 * @param {number} a - первое число
 * @param {number} b - второе число
 * @returns {number} - возвращает сумму чисел a и b
 */
const addition = (a, b) => a + b;
/**
 * функция вычитания двух чисел
 * @param {number} a - первое число
 * @param {number} b - второе число
 * @returns {number} - возвращает разность чисел a и b
 */
const subtraction = (a, b) => a - b;
/**
 * функция умножения двух чисел
 * @param {number} a - первое число
 * @param {number} b - второе число
 * @returns {number} - возвращает произведение чисел a и b
 */
const multiplication = (a, b) => a * b;
/**
 * функция деления двух чисел
 * @param {number} a - первое число
 * @param {number} b - второе число
 * @returns {number} - возвращает частное чисел a и b
 */
const division = (a, b) => a / b;

//Задание 5
/**
 * функция реализовывает арифметические операции двух чисел (сложение, вычитание, умножение, деление)
 * @param {number} arg1 - первое число
 * @param {number} arg2 - второе число
 * @param {string} operation - выбрать одну из арифметических операций "+" "-" "*" "/"
 * @returns {number} возвращает число согласно выбранной арифметической операции
 */
function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case "+":
      return addition(arg1, arg2);
      break;
    case "-":
      return subtraction(arg1, arg2);
      break;
    case "*":
      return multiplication(arg1, arg2);
      break;
    case "/":
      return division(arg1, arg2);
      break;
    default:
      alert("неверная операция");
  }
}

//Задание 6
function getEnterString() {
  let amount = document.querySelector(".stringEnter");
  if (amount.value == "") {
    amount.value = "0";
  }
  return amount.value;
}

function wordVerification() {
  let str = getEnterString();
  let ruble = "";
  let preLastLetter = str.charAt(str.length - 2);
  let lastLetter = str.charAt(str.length - 1);
  if (preLastLetter != 1) {
    switch (lastLetter) {
      case "1":
        ruble = "рубль";
        break;
      case "2":
      case "3":
      case "4":
        ruble = "рубля";
        break;
      default:
        ruble = "рублей";
    }
  } else {
    ruble = "рублей";
  }
  return `Ваша сумма в ${str} ${ruble} успешно зачислена.`;
}

function transferAmount(enrollmentReport) {
  let amount = document.querySelector(".stringEnter");
  amount.value = enrollmentReport;
  enrollmentReport = "";
}

function clearString() {
  let amount = document.querySelector(".stringEnter");
  amount.value = "";
}

"use strict";
const game = {
  gameTable: undefined,
  status: "playing",
  phase: "X",
  mapValues: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  /**
   * Инициализирует игру
   */
  init() {
    this.renderMap();
    this.initEventHandlers();
  },
  /**
   * отрисовывает игровое поля
   */
  renderMap() {
    this.gameTable = document.createElement("table");
    for (let row = 0; row < 3; row++) {
      let tr = document.createElement("tr");
      this.gameTable.appendChild(tr);
      for (let col = 0; col < 3; col++) {
        let td = document.createElement("td");
        td.dataset.row = row.toString();
        td.dataset.col = col.toString();
        tr.appendChild(td);
      }
    }
    let containerGame = document.querySelector(".container_game");
    containerGame.appendChild(this.gameTable);
  },
  /**
   * Инициализирует обработчики событий
   */
  initEventHandlers() {
    this.gameTable.addEventListener("click", (event) =>
      this.cellClickHandler(event)
    );
  },
  /**
   * Определяет событие, которое происходит по клику
   */
  cellClickHandler(event) {
    // если клик не корректный, то прекращает выполнение событий.
    if (!this.isCorrectClick(event)) {
      return;
    }
    this.phaseСolorСhange(event);
    this.fillCell(event);
    // проверка выигрыша
    if (this.hasWon()) {
      // ставит статус игры на стоп
      this.setStatusStoped();
      // говорит выигрышную фразу
      this.sayWonPhrase();
      //перезапуск игру
      this.restart();
    }
    // проверка ничьи
    if (!this.hasDraw()) {
      // ставит статус игры на стоп
      this.setStatusStoped();
      // говорит фразу ничьи
      this.sayDrawPhrase();
      //перезапуск игру
      this.restart();
    }
    // меняет фазу крестиков и ноликов
    this.tooglePhase(event);
  },
  /**
   * Перезапускает игру
   */
  restart() {
    document.querySelector("table").remove();
    this.status = "playing";
    this.phase = "O";
    this.mapValues = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.init();
  },
  /**
   * Проверяет, является ли клик по ячейке корректным
   */
  isCorrectClick(event) {
    return (
      this.isStatusPlaying() &&
      this.isClickByCell(event) &&
      this.isCellEmpty(event)
    );
  },
  /**
   * @returns {boolean} возвращает true, если статус 'playing' (играем)
   */
  isStatusPlaying() {
    return this.status === "playing";
  },
  /**
   * @returns {boolean} возвращает true, если клик был по элементу 'td'
   */
  isClickByCell(event) {
    return event.target.tagName === "TD";
  },
  /**
   * @returns {boolean} возвращает true, если ячейка по которой произведён клик - пустая
   */
  isCellEmpty(event) {
    let row = +event.target.dataset.row;
    let col = +event.target.dataset.col;
    return this.mapValues[row][col] === "";
  },
  /**
   * заполняет ячейку
   */
  fillCell(event) {
    let row = +event.target.dataset.row;
    let col = +event.target.dataset.col;
    this.mapValues[row][col] = this.phase;
    event.target.textContent = this.phase;
  },
  /**
   * Проверяет выигрышную комбинацию на карте
   * @returns {boolean} если игра выиграна возвращает true, иначе false
   */
  hasWon() {
    return (
      this.isLineWon({ y: 0, x: 0 }, { y: 0, x: 1 }, { y: 0, x: 2 }) ||
      this.isLineWon({ y: 1, x: 0 }, { y: 1, x: 1 }, { y: 1, x: 2 }) ||
      this.isLineWon({ y: 2, x: 0 }, { y: 2, x: 1 }, { y: 2, x: 2 }) ||
      this.isLineWon({ y: 0, x: 0 }, { y: 1, x: 0 }, { y: 2, x: 0 }) ||
      this.isLineWon({ y: 0, x: 1 }, { y: 1, x: 1 }, { y: 2, x: 1 }) ||
      this.isLineWon({ y: 0, x: 2 }, { y: 1, x: 2 }, { y: 2, x: 2 }) ||
      this.isLineWon({ y: 0, x: 0 }, { y: 1, x: 1 }, { y: 2, x: 2 }) ||
      this.isLineWon({ y: 0, x: 2 }, { y: 1, x: 1 }, { y: 2, x: 0 })
    );
  },
  /**
   * проверяет выигрышную комибнацию на линии
   * @param {y: int, x: int} a - 1-я ячейка на карте
   * @param {y: int, x: int} b - 2-я ячейка на карте
   * @param {y: int, x: int} c - 3-я ячейка на карте
   * @returns {boolean} - возвращает true если линия выиграна, иначе false
   */
  isLineWon(a, b, c) {
    let value =
      this.mapValues[a.y][a.x] +
      this.mapValues[b.y][b.x] +
      this.mapValues[c.y][c.x];
    return value === "XXX" || value === "OOO";
  },
  /**
   * Проверяет, остались ли пустые ячейки на карте
   */
  hasDraw() {
    let check = false;
    document.querySelectorAll("td").forEach((el) => {
      if (el.textContent === "") {
        check = true;
      }
    });
    return check;
  },
  /**
   * Меняет свойство статуса на "stoped";
   */
  setStatusStoped() {
    this.status = "stoped";
  },
  /**
   * Выводит победную фразу
   */
  sayWonPhrase() {
    let figure = this.phase === "X" ? "Крестики" : "Нолики";
    alert(`${figure} победили!`);
  },
  /**
   * Объявляет ничью
   */
  sayDrawPhrase() {
    alert(`Ничья`);
  },
  /**
   * Меняет phase с крестиков на нолики ("X" на "O")
   */
  tooglePhase(event) {
    this.phase = this.phase === "X" ? "O" : "X";
  },
  /**
   * Меняет цвет фазы. Синий если крестики и красный если нолики
   */
  phaseСolorСhange(event) {
    event.target.style.color = this.phase === "X" ? "#0000FF" : "#FF0000";
  },
};
game.init();

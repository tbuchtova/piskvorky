let move = 'circle';
const player = document.querySelector('.game__menu--player img');
const btnElm = document.querySelectorAll('button');

// posluchač události "game" reaguje na kliknutí; kontroluje se délka classListu a kdo je na tahu; dle toho přidává konkrétní třídu a mění player element v menu

const game = (event) => {
  if (event.target.classList.length == 0) {
    event.target.disabled = true;
    if (move == 'circle') {
      move = 'cross';
      event.target.classList.add('game__field--circle');
      player.src = 'img/cross.svg';
      player.alt = 'křížek';
    } else {
      move = 'circle';
      event.target.classList.add('game__field--cross');
      player.src = 'img/circle.svg';
      player.alt = 'kolečko';
    }
  }

  let vyhra = isWinningMove(event.target);

  if (vyhra === true && move == 'cross') {
    if (confirm('Vyhrálo kolečko. Spustit znovu?') == true) {
      location.reload();
    }
  } else if (vyhra === true && move == 'circle') {
    if (confirm('Vyhrál křížek. Spustit znovu?') == true) {
      location.reload();
    }
  }
};

// button elementů je 100, musí se týkat všech a projít celé pole;

for (let i = 0; i < btnElm.length; i++) {
  btnElm[i].addEventListener('click', game);
}

// funkce getSymbol(field), která pro DOM element políčka s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined

const getSymbol = (field) => {
  if (field.classList.contains('game__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('game__field--circle')) {
    return 'circle';
  }
};

// funkce getField(row, column), která pro číslo řádku a sloupce vrátí příslušný prvek.

const fieldSize = 10;
const fields = document.querySelectorAll('.game__field button');

const getField = (row, column) => {
  return fields[row * fieldSize + column];
};

// funkce getPosition(field), která naopak pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, …

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / fieldSize),
    column: fieldIndex % fieldSize,
  };
};

// S použitím nachystaných funkcí zjisti při každém tahu, jestli se nejedná o výherní. Nový kód navaž na event listener ze čtvrtého úkolu.

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < fieldSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < fieldSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

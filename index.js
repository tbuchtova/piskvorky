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
};

// button elementů je 100, musí se týkat všech a projít celé pole;

for (let i = 0; i < btnElm.length; i++) {
  btnElm[i].addEventListener('click', game);
}

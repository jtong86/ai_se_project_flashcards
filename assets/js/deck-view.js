import { hexToString } from "./colors.js";

const cardTemplateEl = document.querySelector("#card-template");

const deckViewSectionEl = document.querySelector("#deck-view");
const deckViewTitleEl =
  deckViewSectionEl.querySelector(".gallery__title");
const deckViewListEl =
  deckViewSectionEl.querySelector(".gallery__list");

function createCardEl(card, deck) {
  const cloneEl = cardTemplateEl.content
    .querySelector("li")
    .cloneNode(true);

  const cardEl = cloneEl.querySelector(".card");
  const titleEl = cloneEl.querySelector(".card__title");
  const flipBtnEl = cloneEl.querySelector(
    ".card__btn_type_flip"
  );
  const deleteBtnEl = cloneEl.querySelector(
    ".card__btn_type_delete"
  );

  let isFlipped = false;

  titleEl.textContent = card.question;

  const colorName = hexToString(deck.color);

  cardEl.classList.remove("card_color_green");

  if (colorName) {
    cardEl.classList.add(`card_color_${colorName}`);
  }

  flipBtnEl.addEventListener("click", () => {
    isFlipped = !isFlipped;

    titleEl.textContent = isFlipped
      ? card.answer
      : card.question;
  });

  deleteBtnEl.addEventListener("click", () => {
    cloneEl.remove();
  });

  return cloneEl;
}

function renderDeckView(deck) {
  deckViewTitleEl.textContent = deck.name;
  deckViewListEl.innerHTML = "";

  deck.cards.forEach((card) => {
    const cardEl = createCardEl(card, deck);
    deckViewListEl.append(cardEl);
  });
}

export { renderDeckView };
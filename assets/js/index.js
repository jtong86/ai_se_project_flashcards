import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

const deckTemplateEl = document.querySelector("#deck-template");

const homeSectionEl = document.querySelector("#home");
const homeDeckListEl =
  homeSectionEl.querySelector(".gallery__list");

const deckViewSectionEl = document.querySelector("#deck-view");
const practiceBtnEl =
  deckViewSectionEl.querySelector(".gallery__practice-btn");

const mainContentEl = document.querySelector(
  ".page__main-content"
);

const carouselSectionEl = document.querySelector(".carousel");
const notFoundSectionEl = document.querySelector(".not-found");
const aboutSectionEl = document.querySelector(".about");

let currentDeck = null;

function createDeckEl(item) {
  const cloneEl = deckTemplateEl.content
    .querySelector("li")
    .cloneNode(true);

  const deckEl = cloneEl.querySelector(".card");
  const titleEl = cloneEl.querySelector(".card__title");
  const cardCountEl = cloneEl.querySelector(
    ".card__card-count"
  );
  const deleteBtnEl = cloneEl.querySelector(
    ".card__btn_type_delete"
  );
  const deckLinkEl = cloneEl.querySelector(".card__link");

  titleEl.textContent = item.name;
  cardCountEl.textContent = `${item.cards.length} Cards`;

  const colorName = hexToString(item.color);

  deckEl.classList.remove("card_color_green");

  if (colorName) {
    deckEl.classList.add(`card_color_${colorName}`);
  }

  deckLinkEl.href = `#deck/${item.id}`;

  deckLinkEl.setAttribute(
    "aria-label",
    `Open ${item.name} deck`
  );

  deleteBtnEl.setAttribute(
    "aria-label",
    `Delete ${item.name} deck`
  );

  deleteBtnEl.addEventListener("click", () => {
    cloneEl.remove();
  });

  return cloneEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  homeDeckListEl.prepend(deckEl);
}

function renderHomeView() {
  homeDeckListEl.innerHTML = "";

  decks.forEach(renderDeckEl);
}

function hideAllSections() {
  homeSectionEl.style.display = "none";
  deckViewSectionEl.style.display = "none";
  carouselSectionEl.style.display = "none";
  notFoundSectionEl.style.display = "none";
  aboutSectionEl.style.display = "none";
}

function router() {
  const hash = window.location.hash.slice(1);

  hideAllSections();

  mainContentEl.classList.remove(
    "page__main-content_location_carousel"
  );

  if (hash === "" || hash === "home") {
    currentDeck = null;

    homeSectionEl.style.display = "block";
    renderHomeView();
  } else if (hash === "about") {
    currentDeck = null;

    aboutSectionEl.style.display = "block";
  } else if (hash.startsWith("deck/")) {
    const deckId = hash.split("/")[1];
    currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      deckViewSectionEl.style.display = "block";
      renderDeckView(currentDeck);
    } else {
      currentDeck = null;
      notFoundSectionEl.style.display = "block";
    }
  } else if (hash.startsWith("carousel/")) {
    const deckId = hash.split("/")[1];
    currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      carouselSectionEl.style.display = "flex";

      mainContentEl.classList.add(
        "page__main-content_location_carousel"
      );

      renderCarouselView(currentDeck);
    } else {
      currentDeck = null;
      notFoundSectionEl.style.display = "block";
    }
  } else {
    currentDeck = null;
    notFoundSectionEl.style.display = "block";
  }
}

practiceBtnEl.addEventListener("click", () => {
  if (currentDeck) {
    window.location.hash = `carousel/${currentDeck.id}`;
  }
});

renderHomeView();
router();

window.addEventListener("hashchange", router);
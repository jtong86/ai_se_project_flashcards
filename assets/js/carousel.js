import { hexToString } from "./colors.js";

const carouselEl = document.querySelector(".carousel");
const carouselTitleEl = carouselEl.querySelector(".carousel__title");
const carouselCardEl = carouselEl.querySelector(".carousel__card");
const carouselCardTextEl = carouselEl.querySelector(
  ".carousel__card-text"
);

const leftBtn = carouselEl.querySelector(
  ".carousel__btn_type_left"
);
const rightBtn = carouselEl.querySelector(
  ".carousel__btn_type_right"
);
const flipBtn = carouselEl.querySelector(
  ".carousel__btn_type_flip"
);

function disableButton(buttonEl) {
  buttonEl.disabled = true;
  buttonEl.classList.add("carousel__btn_disabled");
}

function enableButton(buttonEl) {
  buttonEl.disabled = false;
  buttonEl.classList.remove("carousel__btn_disabled");
}

function removeColorClasses(element) {
  [...element.classList].forEach((className) => {
    if (className.includes("_color_")) {
      element.classList.remove(className);
    }
  });
}

function getCarouselTitleString(deck, currentIndex) {
  return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
}

function renderCarouselView(deck) {
  let currentIndex = 0;
  let showingQuestion = true;

  const colorName = hexToString(deck.color);

  removeColorClasses(carouselCardEl);
  carouselCardEl.classList.add(
    `carousel__card_color_${colorName}`
  );

  function updateArrowButtons() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    carouselTitleEl.textContent = getCarouselTitleString(
      deck,
      currentIndex
    );

    if (showingQuestion) {
      carouselCardTextEl.textContent = currentCard.question;

      carouselCardEl.classList.remove(
        "carousel__card_color_white"
      );
    } else {
      carouselCardTextEl.textContent = currentCard.answer;

      carouselCardEl.classList.add(
        "carousel__card_color_white"
      );
    }

    updateArrowButtons();
  }

  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  };

  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  };

  flipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };

  updateDisplay();
}

export { renderCarouselView };



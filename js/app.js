const API_URL_RANDOM =
  "https://quote-garden.herokuapp.com/api/v3/quotes/random";

const $app = document.getElementById("app");
const $buttonRefresh = document.getElementById("js_refresh-quote");

const templateRandomQuote = (parent, quote, author, genre) => {
  parent.innerHTML = `
    <article class="quote">
      <p class="quote-text">${quote}</p>
    </article>

    <a href="#" class="quote-author">
      <div class="quote-author-name">
          ${author}
          <span class="quote-author-type">${genre}</span>
      </div>

      <div class="quote-author-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
    </a>
  `;
};

const getRandomQuote = async () => {
  try {
    const data = await fetch(API_URL_RANDOM);
    const response = await data.json();
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

const printRandomQuote = async () => {
  const { quoteAuthor, quoteGenre, quoteText } = await getRandomQuote();
  templateRandomQuote($app, quoteText, quoteAuthor, quoteGenre);
};

$buttonRefresh.addEventListener("click", printRandomQuote);

document.addEventListener("DOMContentLoaded", async () => {
  await printRandomQuote();
});

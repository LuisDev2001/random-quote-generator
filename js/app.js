const API_URL_RANDOM =
  "https://quote-garden.herokuapp.com/api/v3/quotes/random";

const $app = document.getElementById("app");
const $buttonRefresh = document.getElementById("js_refresh-quote");

const templateRandomQuote = (parent, quote, author, genre) => {
  parent.innerHTML = `
    <article class="quote" id="js_one-quote">
      <p class="quote-text">${quote}</p>
    </article>

    <div class="quote-author" id="js_show-all-quote">
      <div class="quote-author-name">
          ${author}
          <span class="quote-author-type">${genre}</span>
      </div>

      <div class="quote-author-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
      <input type="hidden" id="js_author" value="${author}">
      <input type="hidden" id="js_genre" value="${genre}">
    </div>
  `;
};

const templateAllQuotesForAuthor = (parent, quote) => {
  parent.innerHTML += `
    <article class="quote" id="js_one-quote">
      <p class="quote-text">${quote}</p>
    </article>
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

const getAuthorName = () => {
  const author = document.getElementById("js_author").value;
  let authorParams = [],
    authorVal = "";

  for (let index = 0; index < author.length; index++) {
    authorParams.push(author[index].replace(" ", "&"));
  }

  authorVal = authorParams.join("");

  return authorVal;
};

const getQuoteForAuthorAndGenre = async () => {
  const contentAllQuotes = document.createElement("div");
  contentAllQuotes.setAttribute("id", "js_quote-all-container");

  const author = getAuthorName();
  const gnre = document.getElementById("js_genre").value;
  try {
    const data = await fetch(
      `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}?genre=${gnre}`
    );
    const response = await data.json();
    const quotes = response.data;

    quotes.forEach((quote) => {
      templateAllQuotesForAuthor(contentAllQuotes, quote.quoteText);
    });

    $app.appendChild(contentAllQuotes);
  } catch (error) {
    console.log(error);
  }
};

const disappearContents = (event) => {
  event.target.previousElementSibling.classList.add("hidden");
  event.target.classList.add("hidden");
};

$buttonRefresh.addEventListener("click", printRandomQuote);

$app.addEventListener("click", async (event) => {
  if (event.target.id == "js_show-all-quote") {
    disappearContents(event);
    await getQuoteForAuthorAndGenre();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await printRandomQuote();
});

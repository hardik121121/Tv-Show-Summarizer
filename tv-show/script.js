// script.js
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    fetchShows(query);
  }
});

// Fetch popular or random shows for preview
async function fetchPreviewShows() {
  const apiUrl = `https://api.tvmaze.com/shows`; // Fetch all shows or popular ones from TVMaze API
  const previewContainer = document.getElementById("preview-results");
  previewContainer.innerHTML = "<p>Loading preview...</p>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length === 0) {
      previewContainer.innerHTML = "<p>No popular shows available.</p>";
      return;
    }

    previewContainer.innerHTML = "";
    // Loop to display first 10 shows in preview
    data.slice(0, 10).forEach((show) => {
      const card = document.createElement("div");
      card.className = "preview-card";

      const image = show.image
        ? show.image.medium
        : "https://via.placeholder.com/210x295";
      const description = show.summary
        ? show.summary.replace(/<[^>]*>?/gm, "")
        : "No description available.";

      card.innerHTML = `
          <img src="${image}" alt="${show.name}">
          <div class="preview-card-content">
            <h3>${show.name}</h3>
          </div>
        `;
      previewContainer.appendChild(card);
    });
  } catch (error) {
    previewContainer.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    console.error(error);
  }
}

// Fetch shows based on search query
async function fetchShows(query) {
  const apiUrl = `https://api.tvmaze.com/search/shows?q=${query}`;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = "";
    data.forEach((item) => {
      const { show } = item;
      const card = document.createElement("div");
      card.className = "card";

      const image = show.image
        ? show.image.medium
        : "https://via.placeholder.com/210x295";
      const description = show.summary
        ? show.summary.replace(/<[^>]*>?/gm, "")
        : "No description available.";

      card.innerHTML = `
          <img src="${image}" alt="${show.name}">
          <div class="card-content">
            <h2>${show.name}</h2>
            <p>${description}</p>
          </div>
        `;
      resultsContainer.appendChild(card);
    });
  } catch (error) {
    resultsContainer.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    console.error(error);
  }
}

// Load the preview shows when the page loads
window.onload = fetchPreviewShows;

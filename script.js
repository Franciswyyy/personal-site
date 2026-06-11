const themeToggle = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".card");

function updateThemeButton() {
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "切换浅色模式");
  } else {
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "切换暗黑模式");
  }
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

updateThemeButton();

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateThemeButton();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    projectCards.forEach(function (card) {
      const matchesFilter = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.hidden = !matchesFilter;
    });
  });
});

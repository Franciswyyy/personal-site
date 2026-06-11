const themeToggle = document.querySelector(".theme-toggle");

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

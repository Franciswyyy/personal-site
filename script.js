const themeToggle = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".card");
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

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

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();

  formMessage.classList.remove("error", "success");

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "请把称呼、邮箱和留言都填写完整。";
    formMessage.classList.add("error");
    return;
  }

  if (!email.includes("@")) {
    formMessage.textContent = "请填写一个包含 @ 的邮箱地址。";
    formMessage.classList.add("error");
    return;
  }

  formMessage.textContent = `收到，${name}。这条留言目前只在前端完成了校验，还没有发送到服务器。`;
  formMessage.classList.add("success");
  contactForm.reset();
});

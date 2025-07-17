document.addEventListener("DOMContentLoaded", function () {
  // Create theme toggle button
  const themeToggle = document.querySelector("button");
  themeToggle.className = "theme-toggle";
  themeToggle.textContent = "🌙 Dark Mode";
  document.body.appendChild(themeToggle);

  // Check for saved theme preference or system preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️ Light Mode";
    }
  }

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.textContent = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    }
  }

  // Initialize theme on load
  initializeTheme();

  // Add click event to toggle button
  themeToggle.addEventListener("click", toggleTheme);

  // Watch for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        // Only change if no user preference is set
        if (e.matches) {
          document.documentElement.setAttribute("data-theme", "dark");
          themeToggle.textContent = "☀️ Light Mode";
        } else {
          document.documentElement.removeAttribute("data-theme");
          themeToggle.textContent = "🌙 Dark Mode";
        }
      }
    });
});

console.log("Initial theme check:", {
  savedTheme: localStorage.getItem("theme"),
  systemPrefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
});

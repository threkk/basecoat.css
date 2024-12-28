const root = document.querySelector(":root");
document.getElementsByName("theme").forEach((radio) =>
  radio.addEventListener("change", (e) => {
    root.setAttribute("color-scheme", e.target.value);
  }),
);

document.getElementById("brand").addEventListener("change", (e) => {
  const hex = e.target.value;
  root.style.setProperty("--bc-brand-seed", `oklch(from ${hex} l c h)`);
});

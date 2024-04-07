const root = document.querySelector(":root");
document.getElementsByName("theme").forEach((radio) =>
  radio.addEventListener("change", (e) => {
    root.setAttribute("color-scheme", e.target.value);
  }),
);

document.getElementById("alternative").addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  if (isChecked) document.body.className = "alternative";
  else document.body.className = "";
});

document.getElementById("brand").addEventListener("change", (e) => {
  const hex = e.target.value;

  // From https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl
  const r = parseInt(`0x${hex[1]}${hex[2]}`) / 255;
  const g = parseInt(`0x${hex[3]}${hex[4]}`) / 255;
  const b = parseInt(`0x${hex[5]}${hex[6]}`) / 255;

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  root.style.setProperty("--bc-brand-hue", h);
  root.style.setProperty("--bc-brand-saturation", `${s}%`);
  root.style.setProperty("--bc-brand-lightness", `${l}%`);
});

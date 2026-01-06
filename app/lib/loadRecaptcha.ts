let loaded = false;

export function loadRecaptcha(onloadName = "onRecaptchaReady") {
  if (loaded) return;
  loaded = true;
  const s = document.createElement("script");
  s.src = `https://www.google.com/recaptcha/api.js?onload=${onloadName}&render=explicit`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}
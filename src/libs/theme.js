export function GetTheme() {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    return "system";
  }
  return theme;
}

export function SetTheme(theme) {
  localStorage.setItem("theme", theme);
}

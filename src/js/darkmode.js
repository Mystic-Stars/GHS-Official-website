// 明暗模式切换
const themeSwitch = document.getElementById('themeSwitch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  localStorage.setItem('theme', theme);
}

// 检查本地存储或系统偏好
const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(savedTheme);
themeSwitch.checked = savedTheme === 'dark';

themeSwitch.addEventListener('change', () => {
  const currentTheme = themeSwitch.checked ? 'dark' : 'light';
  setTheme(currentTheme);
});

// 监听系统主题变化
prefersDarkScheme.addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  setTheme(newTheme);
  themeSwitch.checked = newTheme === 'dark';
});
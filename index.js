// Находим элементы
const nameInput = document.getElementById("nameInput");
const avatarInput = document.getElementById("avatar");
const messageInput = document.getElementById("messageInput");

const button = document.querySelector(".chat__button");
const nameOutput = document.querySelector(".chat__user");
const avatarChat = document.getElementById("avatarChat");
const messageOutput = document.getElementById("messageOutput");
const box = document.getElementById("box");

button.addEventListener("click", () => {
  // Получаем Имя
  let text = nameInput.value.trim(); // Убираем пробелы по краям
  if (!text) return; // Если поле пустое — ничего не делаем

  text = formatName(text); // Форматируем имя
  nameOutput.textContent = text; // Вставляем в <p>
  nameInput.value = ""; // Очищаем input

  // Получаем ссылку на картинку
  let imageSrc = avatarInput.value.trim();
  if (imageSrc) {
    avatarChat.src = imageSrc; // Устанавливаем src у <img>
    avatarChat.classList.add("chat__avatar"); // Добавляем класс к <img>
    avatarInput.value = ""; // Очищаем поле ввода
  }

  // Получаем сообщение
  let message = messageInput.value.trim();
  if (message) {
    message = checkSpam(message); // Проверяем на спам
    messageOutput.textContent = message;
    messageInput.value = "";
  }
  box.classList.add("chat__text");
});
// Функция форматирования имени
function formatName(name) {
  return name
    .toLowerCase() // Приводим всё к нижнему регистру
    .replace(/^\p{L}/u, (match) => match.toUpperCase()); // Делаем первую букву заглавной
}

// Функция проверки на спам
function checkSpam(str) {
  return str.replace(/viagra|xxx|ххх/gi, "***"); // Заменяем viagra и xxx на ***
}

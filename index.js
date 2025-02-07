// Массив с путями к дефолтным аватарам
const defaultAvatars = [
  "./assets/images/1.jpeg",
  "./assets/images/2.jpeg",
  "./assets/images/3.jpeg",
  "./assets/images/4.jpeg",
  "./assets/images/5.jpeg",
  "./assets/images/6.jpeg",
  "./assets/images/7.jpeg",
];

// Функция для выбора случайного аватара
function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
}

// Находим элементы
const nameInput = document.getElementById("nameInput");
const avatarInput = document.getElementById("avatar");
const messageInput = document.getElementById("messageInput");
const showNameCheckbox = document.getElementById("showName"); // Чекбокс для показа имени
const button = document.querySelector(".chat__button");
const messagesContainer = document.querySelector(".chat__messages");

button.addEventListener("click", () => {
  // Обработка имени: если чекбокс выключен или имя пустое – подставляем "Username"
  let text = nameInput.value.trim();
  if (!showNameCheckbox.checked || !text) {
    text = "Username";
  } else {
    text = formatName(text);
  }

  // Если ссылка на аватар не указана, выбираем случайный дефолтный
  let imageSrc = avatarInput.value.trim() || getRandomAvatar();

  // Получаем и проверяем сообщение
  let message = messageInput.value.trim();
  if (!message) return;
  message = checkSpam(message);

  // Получаем текущую дату и время в читаемом формате
  const currentDate = new Date().toLocaleString();

  // Создаём основной контейнер комментария
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat__message");

  // Создаём элемент для аватара
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("chat__avatar");
  avatarImg.src = imageSrc;

  // Создаём контейнер для текста (имя, дата и само сообщение)
  const textBox = document.createElement("div");
  textBox.classList.add("chat__text");

  // Создаём отдельный контейнер для шапки комментария (имя и дата)
  const headerBox = document.createElement("div");
  headerBox.classList.add("chat__header");

  const userName = document.createElement("p");
  userName.classList.add("chat__user");
  userName.textContent = text;

  const dateElement = document.createElement("p");
  dateElement.classList.add("chat__date");
  dateElement.textContent = currentDate;

  // Собираем шапку: имя и дата
  headerBox.appendChild(userName);
  headerBox.appendChild(dateElement);

  // Создаём элемент для текста комментария
  const userMessage = document.createElement("p");
  userMessage.classList.add("chat__comment");
  userMessage.textContent = message;

  // Собираем общий контейнер текста: сначала шапку, затем сообщение
  textBox.appendChild(headerBox);
  textBox.appendChild(userMessage);

  // Собираем общий элемент комментария: сначала аватар, затем текст
  messageElement.appendChild(avatarImg);
  messageElement.appendChild(textBox);

  // Добавляем новый комментарий в конец списка
  messagesContainer.appendChild(messageElement);

  // Очищаем поля ввода
  nameInput.value = "";
  avatarInput.value = "";
  messageInput.value = "";
});

// Функция форматирования имени (первая буква заглавная, остальные — строчные)
function formatName(name) {
  return name.toLowerCase().replace(/^\p{L}/u, (match) => match.toUpperCase());
}

// Функция проверки на спам
function checkSpam(str) {
  return str.replace(/viagra|xxx|ххх/gi, "***");
}

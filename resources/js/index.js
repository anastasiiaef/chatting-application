const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const saveButton = document.getElementById("save-button");
const serverURL = `https://it3049c-chat.fly.dev/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;
const updateName = document.getElementById("update-name-input");
const nameDisplay = document.getElementById("user-display");
const updateButton = document.getElementById("update-button");

saveButton.addEventListener('click', function(saveButtonClickEvent) {
    saveButtonClickEvent.preventDefault();
    const userName = nameInput.value;
    if (userName.trim() !== '') {
      localStorage.setItem('userName', userName);
      myMessage.removeAttribute('disabled');
      nameDisplay.textContent = userName;
      nameDisplay.value = userName;
      updateButton.style.display = 'block'
      saveButton.setAttribute('hidden', 'true');
      alert('UserName saved successfully');
    } else {
      alert('Please enter yor Name before saving.');
    }
  });

  updateButton.addEventListener('click', function(updateButtonClickEvent) {
    updateButtonClickEvent.preventDefault();
    const userName = nameInput.value;
    if (userName.trim() !== '') {
      localStorage.setItem('userName', userName);
      nameDisplay.textContent = userName;
      nameDisplay.value = userName;
      alert('Username was updated successfully');
    } else {
      alert('Please enter new username before updating.');
    }
  });


async function updateMessagesInChatBox() {
      const messages = await fetchMessages();
      let formattedMessages = "";
      messages.forEach(message => {
          formattedMessages += formatMessage(message, nameInput.value);
      });
      chatBox.innerHTML = formattedMessages;
  }

async function fetchMessages() {
  return fetch(serverURL)
  .then(response => response.json())
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

function sendMessages(userName, text) {
  const newMessage = {
      sender: userName,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  sendMessages(sender,message);
  myMessage.value = "";
});

setInterval(updateMessagesInChatBox, MILLISECONDS_IN_TEN_SECONDS);


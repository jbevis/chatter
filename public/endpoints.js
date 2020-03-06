const getChat = () => {
  $.get('/api/v1/chat')
    .then(chat => {
      chat.forEach(msg => {
        $('#messages').append(
          `<li>${msg.user}: ${msg.message}</li>`
        );
      });
    });
};

const addMessage = (data) => {
  $.post('/api/v1/chat', data, (res, text, resObj) => {
    if (resObj.status === 201) {
      console.log('New message added')
    } 
  });
}

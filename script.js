
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const voiceTaskBtn = document.getElementById('voiceTaskBtn');
const statusMessage = document.getElementById('statusMessage');

document.getElementById('addTaskBtn').addEventListener('click', function() {
    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskInput.value;
        taskList.appendChild(li);
        taskInput.value = '';
        statusMessage.textContent = '';  // Clear status message after adding task
    }
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
    statusMessage.textContent = 'Listening... Please speak now!';
    statusMessage.style.color = 'green';
};

recognition.onspeechend = function() {
    statusMessage.textContent = 'Processing...';
    recognition.stop();
};

recognition.onresult = function(event) {
    console.log('Result received: ', event.results[0][0].transcript);
    const transcript = event.results[0][0].transcript;
    document.getElementById('taskInput').value = transcript;
    document.getElementById('addTaskBtn').click();
    statusMessage.textContent = 'Task added: "' + transcript + '"';
    statusMessage.style.color = 'blue';
};

recognition.onerror = function(event) {
    statusMessage.textContent = 'Error occurred: ' + event.error;
    statusMessage.style.color = 'red';
};

document.getElementById('voiceTaskBtn').addEventListener('click', function() {
    console.log('Voice recognition initiated.');
    statusMessage.textContent = 'Starting voice recognition...';
    statusMessage.style.color = 'orange';
    recognition.start();
});

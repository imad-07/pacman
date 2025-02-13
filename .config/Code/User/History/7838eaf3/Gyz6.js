const http = require('http'); // Or 'https' if using HTTPS

// Server URL
const options = {
  hostname: 'localhost',
  port: 8080, // Replace with your server's port
  path: '/submit', // Endpoint path
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

// Function to send a form with a textarea named 'input'
function sendForm(data) {
  const formData = `input=${encodeURIComponent(data)}`;

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`Response: ${chunk}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Write form data to the request body
  req.write(formData);
  req.end();
}

for (let i = 0; i < 9000; i++){
    sendForm('This is the text data to send to the server.');
}
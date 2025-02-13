// URL for the server
const url = 'http://localhost:8080'; // Replace with your server's endpoint

// Function to send a form with a textarea
function sendForm(data) {
  // Create a form element
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;

  // Create a textarea named 'input'
  const textarea = document.createElement('textarea');
  textarea.name = 'input';
  textarea.value = data; // Set the data for the textarea
  form.appendChild(textarea);

  // Optionally add the form to the document (not necessary for submission)
  document.body.appendChild(form);

  // Submit the form
  form.submit();
}

// Example usage
sendForm('This is the text data to send to the server.');

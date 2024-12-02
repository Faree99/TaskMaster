document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Simple validation
  if (username && email && password) {
    // Save user data to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to login page after registration
    alert('Account created successfully! Please log in.');
    window.location.href = 'login.html';
  } else {
    alert('Please fill all the fields.');
  }
});

  
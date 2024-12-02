document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;

  // Retrieve stored user data
  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  // Validate credentials
  if (loginEmail === storedEmail && loginPassword === storedPassword) {
    alert('Login successful!');
    // Redirect to dashboard or home page
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid email or password.');
  }
});

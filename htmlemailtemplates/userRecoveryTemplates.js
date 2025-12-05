export const generateRecoveryEmailTemplate = (resetLink) => {
  return `
    <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Request</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
      color: #333333;
    }
    .container {
      width: 100%;
      padding: 20px;
    }
    .email-card {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #F33C38, #F33C38);
      padding: 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .body {
      padding: 30px;
      text-align: center;
    }
    .body p {
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .button {
      display: inline-block;
      background: #F33C38;
      color: #ffffff !important;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      text-decoration: none;
      transition: background 0.3s ease;
    }
    .footer {
      padding: 20px;
      font-size: 12px;
      color: #666666;
      text-align: center;
      background: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-card">
      <!-- Header -->
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>

      <!-- Body -->
      <div class="body">
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to choose a new password for your account.</p>
        <p><a href="${resetLink}" class="button">Reset Password</a></p>
        <p>If you did not request this change, you can safely ignore this email. Your password will remain the same.</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Straight Up Digital. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>

    `;
}
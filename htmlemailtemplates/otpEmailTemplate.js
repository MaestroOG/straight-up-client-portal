export const generateOTPEmail = (otp, name) => {
  return `
    <!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your One-Time Passcode</title>
  <style>
    /* Dark mode-friendly hints (some clients honor this) */
    @media (prefers-color-scheme: dark) {
      .bg { background:#0b0c10 !important; }
      .card { background:#121317 !important; }
      .text { color:#e8e8ea !important; }
      .muted { color:#b8bac1 !important; }
      .divider { border-color:#2a2d36 !important; }
      .btn { background:#2563eb !important; color:#ffffff !important; }
      .code { background:#1a1c22 !important; color:#ffffff !important; }
    }
    /* Prevent iOS auto-link blue */
    a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; }
  </style>
</head>
<body class="bg" style="margin:0;padding:0;background:#f4f6fa;">
  <!-- Preheader (hidden in most clients) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your Straight Up Digital verification code is ${otp}. It expires in 10 minutes.
  </div>

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fa;margin:0;padding:32px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;" class="card">
          
          <!-- Header bar -->
          <tr>
            <td style="background:#39B54A;padding:18px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.2;color:#ffffff;font-weight:700;">
                    Straight Up Digital
                  </td>
                  <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#ffefef;">
                    Secure Verification
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <h1 class="text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;color:#0f172a;font-weight:800;">
                Your One-Time Passcode
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 4px 28px;">
              <p class="text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#1f2937;">
                Hi ${name}, use the code below to finish signing in to your account.
              </p>
            </td>
          </tr>

          <!-- OTP big code -->
          <tr>
            <td style="padding:16px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
                <tr>
                  <td class="code" style="text-align:center;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:18px 12px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;letter-spacing:6px;font-size:30px;line-height:38px;font-weight:800;color:#000000;">
                      ${otp}
                    </div>
                    <div class="muted" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;margin-top:8px;">
                      This code expires in 10 minutes.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>


          <!-- Divider -->
          <tr>
            <td style="padding:8px 28px 0 28px;">
              <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:0;">
            </td>
          </tr>

          <!-- Tips -->
          <tr>
            <td style="padding:16px 28px 6px 28px;">
              <p class="muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#6b7280;">
                For your security, don’t share this code with anyone. If you didn’t request it, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px;background:#f8fafc;">
              <p class="muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">
                Straight Up Digital · Australia
              </p>
              <p class="muted" style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#6b7280;">
                Need help? <a href="mailto:support@Straight Up Digital.com" style="color:#2563eb;text-decoration:none;">support@Straight Up Digital.com</a>
              </p>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
  <!-- /Wrapper -->
</body>
</html>

    `;
}
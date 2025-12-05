export const generatePartnershipEmailTemplate = (email, monthlyProjectVolume, name, position, phoneNum, contactEmail, companyName, abn, companyWebsite, businessAddress, yearsInBiz, numOfActiveClients, companyStructure, serviceModel, isUsingWhiteLabelProvider, primaryServices, industriesWorkWith, regionsServe, challengeDetail) => {
  return `
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Partner Application</title>
    <style>
      @media only screen and (max-width: 620px) {
        .container { width: 100% !important; }
        .content { padding: 20px !important; }
        .h1 { font-size: 22px !important; }
        .cell-label { width: 40% !important; }
      }
      a { text-decoration: none; }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif; color:#111827;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7fb;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="680" class="container" style="width:680px; max-width:100%; background:#ffffff; border-radius:14px; box-shadow:0 6px 22px rgba(17,24,39,.10); overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background:#F33C38; padding:28px;">
                <h1 class="h1" style="margin:0; color:#ffffff; font-size:26px; line-height:1.3; font-weight:800;">
                  New Partner Application
                </h1>
                <p style="margin:6px 0 0; color:#cbd5e1; font-size:13px;">
                  Submitted via Straight Up Digital Portal
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="content" style="padding:32px;">
                <p style="margin:0 0 18px; font-size:15px; color:#374151;">
                  Please review the details below.
                </p>

                <!-- Details Table -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-size:14px;">
                  <!-- Account -->
                  <tr>
                    <td colspan="2" style="padding:12px 0; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Account
                    </td>
                  </tr>
                  <tr>
                    <td class="cell-label" style="width:260px; padding:10px 0; color:#6b7280;">Email</td>
                    <td style="padding:10px 0; color:#111827;">${email}</td>
                  </tr>
                  <!-- Primary Contact -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Primary Contact
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Name</td>
                    <td style="padding:10px 0; color:#111827;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Position / Title</td>
                    <td style="padding:10px 0; color:#111827;">${position}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Phone Number</td>
                    <td style="padding:10px 0; color:#111827;">${phoneNum}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Accounts Contact Email</td>
                    <td style="padding:10px 0; color:#111827;">${contactEmail}</td>
                  </tr>

                  <!-- Agency Details -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Agency Details
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Agency Name</td>
                    <td style="padding:10px 0; color:#111827;">${companyName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">ABN</td>
                    <td style="padding:10px 0; color:#111827;">${abn}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Company Website</td>
                    <td style="padding:10px 0; color:#111827;">
                      <a href=${companyWebsite} target="_blank" style="color:#2563eb;">${companyWebsite}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Business Address</td>
                    <td style="padding:10px 0; color:#111827;">${businessAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Years in Business</td>
                    <td style="padding:10px 0; color:#111827;">${yearsInBiz}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Approx. Active Clients</td>
                    <td style="padding:10px 0; color:#111827;">${numOfActiveClients}</td>
                  </tr>

                  <!-- Structure & Model -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Structure & Model
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Company Structure</td>
                    <td style="padding:10px 0; color:#111827;">${companyStructure}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Typical Service Model</td>
                    <td style="padding:10px 0; color:#111827;">${serviceModel}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Uses White Label Provider?</td>
                    <td style="padding:10px 0; color:#111827;">${isUsingWhiteLabelProvider.toUpperCase()}</td>
                  </tr>

                  <!-- Services & Markets -->
                  <tr>
                    <td colspan="2" style="padding:16px 0 12px; font-weight:800; color:#111827; border-bottom:1px solid #e5e7eb;">
                      Services & Markets
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Primary Services</td>
                    <td style="padding:10px 0; color:#111827;">${primaryServices}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Industries Worked With</td>
                    <td style="padding:10px 0; color:#111827;">${industriesWorkWith}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Regions Served</td>
                    <td style="padding:10px 0; color:#111827;">${regionsServe}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Monthly Project Volume</td>
                    <td style="padding:10px 0; color:#111827;">${monthlyProjectVolume}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0; color:#6b7280;">Challenges Detail</td>
                    <td style="padding:10px 0; color:#111827;">
                      ${challengeDetail}
                    </td>
                  </tr>
                </table>

                      <p style="margin:14px 0 0; font-size:12px; color:#6b7280;">
                        Manage this request in the <a href="https://portal.Straight Up Digital.com" style="color:#2563eb;">Portal</a>.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:16px 24px; font-size:12px; color:#6b7280; text-align:center;">
                Straight Up Digital • Automated Notification • Please do not reply
              </td>
            </tr>
          </table>

          <!-- Spacer -->
          <div style="height:24px; line-height:24px;">&nbsp;</div>
        </td>
      </tr>
    </table>
  </body>
</html>
        `
}

export const generateAcceptEmailTemplate = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Partnership Accepted - Straight Up Digital</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6fa; color:#333;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
    <!-- Header -->
    <tr>
      <td align="center" style="background-color:#F33C38; padding:30px;">
        <h1 style="margin:0; font-size:28px; color:#ffffff; font-weight:bold;">Straight Up Digital</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:40px 30px;">
        <h2 style="margin:0; font-size:22px; color:#0d47a1; font-weight:600;">🎉 Congratulations!</h2>
        <p style="font-size:16px; line-height:1.6; margin-top:15px;">
          We’re excited to let you know that your request for a <strong>partnership with Straight Up Digital</strong> has been <span style="color:green; font-weight:bold;">accepted</span>.
        </p>
        <!-- New credit line -->
        <p style="font-size:16px; line-height:1.6; color:#333;">
          You’ve also been <strong>credited 250 AUD</strong> by our admin team to help you get started.
        </p>
        <p style="font-size:16px; line-height:1.6;">
          You can now access your account and explore the <strong>Client Portal</strong>, where you’ll find all the tools and resources you need to get started.
        </p>

        <!-- New sentence -->
        <p style="font-size:15px; line-height:1.6; margin-top:20px; text-align:center; color:#444;">
          Want to learn how to use the portal? <a href="https://portal.Straight Up Digital.com/how-to" target="_blank" style="color:#0d47a1; font-weight:600; text-decoration:none;">Watch this video first</a>.
        </p>

        <!-- Call to Action -->
        <div style="text-align:center; margin:30px 0;">
          <a href="https://portal.Straight Up Digital.com/login" target="_blank" 
             style="background-color:#F33C38; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:8px; font-size:16px; font-weight:600; display:inline-block;">
             Log In to Client Portal
          </a>
        </div>

        <p style="font-size:15px; line-height:1.6; color:#555;">
          Thank you for trusting Straight Up Digital. We’re excited to begin this journey with you.  
          If you have any questions or need help, feel free to reach out to our support team anytime.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background-color:#f0f3f9; padding:20px;">
        <p style="margin:0; font-size:13px; color:#777;">
          © 2025 Straight Up Digital. All rights reserved.<br/>
          <a href="https://Straight Up Digital.com" style="color:#0d47a1; text-decoration:none;">Visit our website</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>

`;
}


export const generateRejectEmailTemplate = () => {
  return `
    <!DOCTYPE html>
<html lang="en" style="background:#f4f6fa;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Partnership Application – Straight Up Digital</title>
</head>
<body style="margin:0; padding:24px; background:#f4f6fa; font-family:Arial, Helvetica, sans-serif; color:#111827;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:100%; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(17,24,39,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#F33C38; padding:28px;">
              <h1 style="margin:0; font-size:26px; line-height:1.3; color:#ffffff; font-weight:800;">
                Straight Up Digital
              </h1>
              <p style="margin:6px 0 0; color:#cfe0ff; font-size:13px;">
                Partnership Application Update
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 10px; font-size:22px; color:#F33C38; font-weight:700;">
                Application Status: Not Approved
              </h2>
              <p style="margin:10px 0 14px; font-size:15px; line-height:1.6; color:#374151;">
                Hi there,  
                Thank you for your interest in partnering with <strong>Straight Up Digital</strong>. After careful review,
                we’re unable to proceed with your application at this time.
              </p>
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#374151;">
                We truly appreciate the time you took to apply. You’re welcome to reapply in the future, especially if
                there are updates to your services, portfolio, or business details that may strengthen your fit.
              </p>

              <!-- Optional reason block (hide/remove if not used) -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; margin:16px 0;">
                <tr>
                  <td style="padding:16px 18px; font-size:14px; color:#374151;">
                    <strong style="display:inline-block; margin-bottom:6px; color:#111827;">Why this decision?</strong><br/>
                    Our review considers current program capacity, service alignment, and quality requirements.
                    Unfortunately, we weren’t able to confirm a fit at this time.
                  </td>
                </tr>
              </table>

              <p style="margin:12px 0 0; font-size:13px; color:#6b7280; text-align:center;">
                If you have additional information you’d like us to consider, please reply to this email or reach out to our team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0f3f9; padding:16px 24px; text-align:center; font-size:12px; color:#6b7280;">
              © 2025 Straight Up Digital • This is an automated notification
            </td>
          </tr>
        </table>

        <!-- Spacer -->
        <div style="height:24px; line-height:24px;">&nbsp;</div>
      </td>
    </tr>
  </table>
</body>
</html>

    `;
}


export const generateProjectCreatedEmailTemplate = (companyName, projectTitle, service, packageSelected, projectUrl) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Project Created</title>
</head>
<body style="margin:0; padding:0; background-color:#f9fafb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px; background:#F33C38; border-top-left-radius:12px; border-top-right-radius:12px; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">New Project Created</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#111827;">
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6;">
                A new project has been successfully created with the following details:
              </p>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px; font-size:15px;">
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Company Name:</td>
                  <td style="padding:8px 0; color:#374151;">${companyName}</td>
                </tr>
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Project Title:</td>
                  <td style="padding:8px 0; color:#374151;">${projectTitle}</td>
                </tr>
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Service:</td>
                  <td style="padding:8px 0; color:#374151;">${service.replace(/([a-z])([A-Z][a-z])/g, "$1 $2").replace(/([a-z])([A-Z]+$)/g, "$1 $2").replace(/^./, (s) => s.toUpperCase()).trim()}</td>
                </tr>
                <tr>
                  <td width="150" style="font-weight:bold; padding:8px 0;">Package Selected:</td>
                  <td style="padding:8px 0; color:#374151;">${packageSelected}</td>
                </tr>
              </table>

              <!-- View Project Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="${projectUrl}" target="_blank" 
                   style="display:inline-block; background:#F33C38; color:#ffffff; padding:12px 24px; font-size:15px; font-weight:bold; text-decoration:none; border-radius:6px;">
                  View Project
                </a>
              </div>

              <p style="margin:0; font-size:14px; color:#6b7280; text-align:center;">
                You can view and manage this project from your dashboard.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px; background:#f3f4f6; border-bottom-left-radius:12px; border-bottom-right-radius:12px; font-size:13px; color:#6b7280;">
              © 2025 Straight Up Digital. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

export const generateApplicationReceivedUserEmail = (name, companyName, email) => {
  return `
  <!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank you for your interest</title>
  <style>
    /* Prevent iOS auto-link styling */
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    /* Dark mode hints (some clients respect this) */
    @media (prefers-color-scheme: dark) {
      .bg { background: #0b0c10 !important; }
      .card { background: #121317 !important; }
      .text { color: #e8e8ea !important; }
      .muted { color: #b8bac1 !important; }
      .btn { background: #2563eb !important; color: #ffffff !important; }
      .divider { border-color: #2a2d36 !important; }
    }
  </style>
</head>
<body class="bg" style="margin:0;padding:0;background:#f4f6fa;">
  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fa;margin:0;padding:30px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;" class="card">
          

          <!-- Hero -->
          <!-- Hero -->
<tr>
  <td style="padding:24px 24px;background:#F33C38;">
    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:32px;color:#ffffff;font-weight:700;">
      Thanks for your interest, ${name}!
    </h1>
  </td>
</tr>


          <!-- Message -->
          <tr>
            <td style="padding:16px 28px 8px 28px;">
              <p class="text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#1f2937;">
                We’ve received your partner application for <strong>${companyName}</strong> and our team is now reviewing your information.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 16px 28px;">
              <p class="muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#6b7280;">
                You’ll hear from us shortly with the next steps. In the meantime, feel free to reply to this email if you have any questions.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:8px 28px 0 28px;">
              <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:0;">
            </td>
          </tr>

          <!-- Summary (optional) -->
          <tr>
            <td style="padding:16px 28px 28px 28px;">
              <p class="muted" style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;">
                Application Summary
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#374151;">
                <tr>
                  <td style="padding:6px 0;width:180px;color:#6b7280;">Applicant</td>
                  <td style="padding:6px 0;font-weight:600;" class="text">${name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;">Company</td>
                  <td style="padding:6px 0;font-weight:600;" class="text">${companyName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;">Email</td>
                  <td style="padding:6px 0;" class="text"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px;background:#f8fafc;">
              <p class="muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
                Straight Up Digital · Australia
              </p>
              <p class="muted" style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
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

export const generateNoteCreatedEmailUserTemplate = (commentUrl, name, projectTitle) => {
  return `
  <!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Comment submitted</title>
  <style>
    a[x-apple-data-detectors]{ color:inherit!important; text-decoration:none!important; }
    @media (prefers-color-scheme: dark) {
      .bg { background:#0b0c10!important; }
      .card { background:#121317!important; }
      .text { color:#e8e8ea!important; }
      .muted { color:#b8bac1!important; }
      .divider { border-color:#2a2d36!important; }
      .btn { background:#F33C38!important; color:#ffffff!important; }
      .btn span { color:#ffffff!important; }
    }
  </style>
  <!--[if mso]>
    <style>
      .fallback-font { font-family: Arial, sans-serif !important; }
    </style>
  <![endif]-->
</head>
<body class="bg" style="margin:0;padding:0;background:#f4f6fa;">
  <!-- Preheader (hidden in most clients) -->
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
    Your comment was submitted successfully. Our admin team will review it shortly.
  </div>

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fa;margin:0;padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;" class="card">
          
          <!-- Header / Brand Bar -->
          <tr>
            <td style="padding:20px 24px;background:#F33C38;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">
                    Straight Up Digital Client Portal
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <h1 class="fallback-font text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;color:#0f172a;font-weight:700;">
                ${name}! just added a comment.
              </h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:0 28px 16px 28px;">
              <p class="fallback-font text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#1f2937;">
                on project with title "${projectTitle}"
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:8px 28px 28px 28px;">
              <!-- Bulletproof button -->
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" bgcolor="#F33C38" style="border-radius:8px;">
                    <a href="${commentUrl}" target="_blank"
                       class="btn"
                       style="display:inline-block;padding:12px 20px;border-radius:8px;background:#F33C38;text-decoration:none;">
                      <span class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:14px;color:#ffffff;font-weight:700;">
                        View in Portal
                      </span>
                    </a>
                  </td>
                </tr>
              </table>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
  <!-- /Wrapper -->
</body>
</html>  `;
}



export const generateAdminToUserEmailNoteTemplate = (projectTitle, name, createdAt, commentUrl) => {
  return `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New comment from Team Straight Up Digital</title>
  <style>
    a[x-apple-data-detectors]{ color:inherit!important; text-decoration:none!important; }
    @media (prefers-color-scheme: dark) {
      .bg { background:#0b0c10!important; }
      .card { background:#121317!important; }
      .text { color:#e8e8ea!important; }
      .muted { color:#b8bac1!important; }
      .divider { border-color:#2a2d36!important; }
      .chip { background:#1f2937!important;color:#e5e7eb!important;border-color:#2a2d36!important; }
      .btn { background:#F33C38!important;color:#ffffff!important; }
      .btn span { color:#ffffff!important; }
    }
  </style>
  <!--[if mso]>
    <style>.fallback-font { font-family: Arial, sans-serif !important; }</style>
  <![endif]-->
</head>
<body class="bg" style="margin:0;padding:0;background:#f4f6fa;">
  <!-- Preheader (hidden) -->
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
    Team Straight Up Digital commented on “${projectTitle}”
  </div>

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;margin:0;padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;">
          
          <!-- Header / Brand Bar -->
          <tr>
            <td style="padding:18px 24px;background:#F33C38;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:#ffffff;">
                    Straight Up Digital Client Portal
                  </td>
                  <td align="right" class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#ffeceb;">
                    New Comment
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <h1 class="fallback-font text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;color:#0f172a;font-weight:700;">
                Hi ${name}, Team Straight Up Digital left a comment
              </h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:0 28px 16px 28px;">
              <p class="fallback-font text" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#1f2937;">
                Your project <strong>${projectTitle}</strong> has a new update from our team.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:8px 28px 0 28px;">
              <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:0;">
            </td>
          </tr>

          <!-- Comment Block -->
          <tr>
            <td style="padding:16px 28px 8px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
                <tr>
                  <td width="120" class="fallback-font muted" style="padding:6px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b7280;">
                    From
                  </td>
                  <td class="fallback-font text" style="padding:6px 0;font-size:14px;color:#374151;font-weight:600;">
                    Team Straight Up Digital
                  </td>
                </tr>
                <tr>
                  <td width="120" class="fallback-font muted" style="padding:6px 0;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b7280;">
                    Posted
                  </td>
                  <td class="fallback-font text" style="padding:6px 0;font-size:14px;color:#374151;">
                    ${createdAt}
                  </td>
                </tr>
              </table>
<tr>
                  <td align="center" bgcolor="#F33C38" style="border-radius:0px;">
                    <a href="${commentUrl}" target="_blank"
                       class="btn"
                       style="display:inline-block;padding:12px 20px;border-radius:8px;background:#F33C38;text-decoration:none;">
                      <span class="fallback-font" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:14px;color:#ffffff;font-weight:700;">
                        View in Portal
                      </span>
                    </a>
                  </td>
                </tr>
             
            </td>
          </tr>

            </td>
          </tr>


          <tr>
            <td align="center" style="padding:18px;background:#f8fafc;">
              <p class="fallback-font muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
                Straight Up Digital · Australia
              </p>
              <p class="fallback-font muted" style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
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
export const generatePartnerShipEndEmail = (email, name, companyName, endDate, supportEmail) => {
  return `
    <!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Partnership Update</title>
  <style>
    /* Dark mode hints (respected by some clients) */
    @media (prefers-color-scheme: dark) {
      .bg     { background:#0b0c10 !important; }
      .card   { background:#121317 !important; }
      .text   { color:#e8e8ea !important; }
      .muted  { color:#b8bac1 !important; }
      .btn    { background:#39B54A !important; color:#ffffff !important; }
      .divider{ border-color:#2a2d36 !important; }
    }
    /* Mobile tweaks */
    @media screen and (max-width:600px){
      .px   { padding-left:16px !important; padding-right:16px !important; }
      .py   { padding-top:20px !important; padding-bottom:20px !important; }
      .w-100{ width:100% !important; }
    }
  </style>
</head>
<body class="bg" style="margin:0;padding:0;background:#f4f6fa;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your partnership with Straight Up Digital has ended. Here’s what happens next.
  </div>

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fa;margin:0;padding:30px 0;">
    <tr>
      <td align="center" style="padding:0 16px;">
        <!-- Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;" class="card">
          
          <!-- Brand Header -->
          <tr>
            <td style="background:#39B54A;padding:22px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:24px;color:#ffffff;font-weight:700;letter-spacing:.3px;">
                      Straight Up Digital
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#ffeceb;opacity:.95;">
                      Partnership Update
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero / Title -->
          <tr>
            <td class="px py" style="padding:28px;">
              <h1 class="text" style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:30px;color:#0f172a;font-weight:700;">
                Partnership Status: Ended
              </h1>
              <p class="muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#6b7280;">
                Hi ${name},
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td class="px" style="padding:0 28px 8px 28px;">
              <p class="text" style="margin:0 0 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#1f2937;">
                We’re writing to let you know that your partnership with <strong>Straight Up Digital</strong> for <strong>${companyName}</strong> has been formally ended as of <strong>${endDate}</strong>.
              </p>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td class="px" style="padding:0 28px 8px 28px;">
              <p class="muted" style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#9ca3af;">
                What Happens Next
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;color:#374151;">
                <tr>
                  <td style="padding:6px 0;width:8px;vertical-align:top;">•</td>
                  <td style="padding:6px 0;" class="text">Access to partner resources and dashboards will be removed.</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">•</td>
                  <td style="padding:6px 0;" class="text">Outstanding invoices will continue to follow the agreed terms.</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;vertical-align:top;">•</td>
                  <td style="padding:6px 0;" class="text">If you require data exports or records, request them from the admin team.</td>
                </tr>
              </table>
            </td>
          </tr>

            <!-- Divider -->
          <tr>
            <td style="padding:12px 28px 0 28px;">
              <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:0;">
            </td>
          </tr>

          <!-- Support / CTA -->
          <tr>
            <td class="px" style="padding:16px 28px 28px 28px;">
              <p class="text" style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#1f2937;">
                Our team is here to help with a smooth wrap-up. If you have any questions or would like to discuss re-engagement in the future, please reach out.
              </p>

              <!-- Bulletproof Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
                <tr>
                  <td align="left" style="border-radius:8px;" bgcolor="#39B54A">
                    <a
                      href="${supportEmail}"
                      target="_blank"
                      class="btn"
                      style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;text-decoration:none;padding:12px 18px;display:inline-block;border-radius:8px;background:#39B54A;color:#ffffff;font-weight:700;"
                    >
                      Contact Support
                    </a>
                  </td>
                </tr>
              </table>

              <p class="muted" style="margin:14px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#6b7280;">
                Or email us at <a href="mailto:${supportEmail}" style="color:#2563eb;text-decoration:none;">${supportEmail}</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px;background:#f8fafc;">
              <p class="muted" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
                Straight Up Digital · Australia
              </p>
              <p class="muted" style="margin:8px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6b7280;">
                This message was sent to ${email}. If you believe this was an error, please contact support.
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

export function generateAuditEmail({ companyName, auditTitle, service, fields }) {
  // Build dynamic table rows for all fields
  let fieldsHtml = "";
  for (const [key, value] of Object.entries(fields)) {
    // Convert camelCase key to readable label
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    // Format boolean values as Yes/No
    const formattedValue =
      typeof value === "boolean" ? (value ? "Yes" : "No") : value || "-";

    fieldsHtml += `
      <tr>
        <td width="180" style="font-weight:bold; padding:8px 0;">${label}:</td>
        <td style="padding:8px 0; color:#374151;">${formattedValue}</td>
      </tr>
    `;
  }

  // Format service name nicely
  const formattedService = service
    .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z])([A-Z]+$)/g, "$1 $2")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();

  // Return full HTML email
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Audit Created</title>
</head>
<body style="margin:0; padding:0; background-color:#f9fafb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px; background:#39B54A; border-top-left-radius:12px; border-top-right-radius:12px; color:#ffffff;">
              <h1 style="margin:0; font-size:24px;">New Audit Created</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#111827;">
              <p style="margin:0 0 20px; font-size:16px; line-height:1.6;">
                A new audit has been successfully created with the following details:
              </p>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px; font-size:15px;">
                <tr>
                  <td width="180" style="font-weight:bold; padding:8px 0;">Company Name:</td>
                  <td style="padding:8px 0; color:#374151;">${companyName}</td>
                </tr>
                <tr>
                  <td width="180" style="font-weight:bold; padding:8px 0;">Audit Title:</td>
                  <td style="padding:8px 0; color:#374151;">${auditTitle}</td>
                </tr>
                <tr>
                  <td width="180" style="font-weight:bold; padding:8px 0;">Service:</td>
                  <td style="padding:8px 0; color:#374151;">${formattedService}</td>
                </tr>

                <!-- Dynamic Fields -->
                ${fieldsHtml}

              </table>
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
</html>
  `;
}

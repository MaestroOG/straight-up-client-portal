export const generateTaskOverdueEmail = (task) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Overdue Task Notification</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f7f7f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f7f7; padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color:#39B54A; color:#ffffff; text-align:center; padding:16px 0; font-size:20px; font-weight:bold;">
              ⚠️ Task Overdue
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin:0 0 12px;">The following task is overdue:</p>
              <p style="margin:0 0 8px;"><strong>Title:</strong> ${task.title}</p>
              <p style="margin:0 0 8px;"><strong>Due Date:</strong> ${task.dueDate.toDateString()}</p>
              <p style="margin:0 0 8px;"><strong>Created By:</strong> ${task.createdBy.email}</p>
              <p style="margin:0 0 16px;"><strong>Description:</strong> ${task.description || "No description"}</p>
              <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
              <p style="font-size:13px; color:#666; margin:0;">Please review and take necessary action as soon as possible.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f1f1f1; text-align:center; padding:16px; font-size:12px; color:#888;">
              © ${new Date().getFullYear()} Straight Up Digital. All rights reserved.
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


export const generateTaskNotification = (task_title, task_description, due_date, cta_url) => {
  return `
  <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Task Assigned</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f4f6f8;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .header {
      background: #39B54A;
      color: #fff;
      text-align: center;
      padding: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .content {
      padding: 25px;
      line-height: 1.6;
    }
    .task-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 15px;
      margin: 15px 0;
    }
    .btn {
      display: inline-block;
      background: #39B54A;
      color: #fff !important;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 8px;
      margin-top: 10px;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 15px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      New Task Assigned
    </div>
    <div class="content">
      <p>Hi there,</p>
      <p>You’ve been assigned a new task .</p>

      <div class="task-box">
        <strong>${task_title}</strong><br>
        <span>${task_description}</span><br>
        <small><strong>Due:</strong> ${due_date}</small>
      </div>

      <a href="${cta_url}" class="btn">View Task</a>

      <p style="font-size:14px;color:#555;margin-top:20px;">
        If you have any questions, reach out to support@Straight Up Digital.com.
      </p>
    </div>
    <div class="footer">
      © 2025 Straight Up Digital — This is an automated message.
    </div>
  </div>
</body>
</html>
  `;
}

export const generateTaskCommentNotification = (user_name, task_title, task_url, comment_time) => {
  return `
  <!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New Comment on Your Task</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f6f8fa;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .header {
      background: #39B54A;
      color: #fff;
      text-align: center;
      padding: 14px;
      font-size: 18px;
      font-weight: bold;
    }
    .content {
      padding: 24px;
      line-height: 1.6;
      font-size: 15px;
    }
    .comment {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 12px;
      margin: 16px 0;
    }
    .btn {
      display: inline-block;
      background: #39B54A;
      color: #fff !important;
      text-decoration: none;
      padding: 10px 18px;
      border-radius: 6px;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      padding: 16px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Comment on Your Task</div>

    <div class="content">
      <p>Hi ${user_name},</p>

      <p>Someone commented on a task you’re assigned to:</p>

      <div class="comment">
        <strong>${task_title}</strong><br>
      </div>

      <a href="${task_url}" class="btn">View Task</a>

      <p style="margin-top:20px; font-size:13px; color:#555;">
        Posted on ${comment_time}.
      </p>
    </div>

    <div class="footer">
      © 2025 TaskBoard — You’re receiving this because you’re assigned to the task.
    </div>
  </div>
</body>
</html>

  `;
}
export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

  console.log("post_data", post_data);

  if (!post_data) {
    return { status: "error", message: "Invalid data" };
  } else {
    const body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the nSight Family</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #000000; margin: 0; padding: 0; height: 100vh;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #000000; margin: 0; padding: 0; height: inherit;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; border-radius: 10px;">
                    <tr>
                        <td align="center" style="padding: 0px;  border-radius: 10px; overflow: hidden;">
                            <img src="https://res.cloudinary.com/nsight/image/upload/v1716956060/welcome_banner_86a1a17412.jpg" alt="nSight Logo" style="width: 100%; height: auto;">
                        </td>
                    </tr>
                    <tr style="margin: -4px 26px 30px 26px;
                        display: block;
                        padding: 30px;
                        background: #ffffff;
                        border-bottom-left-radius: 15px;
                        border-bottom-right-radius: 15px;"
                      >
                        <td>
                            <h1 style="margin: 0 0 20px; font-size: 24px; color: #333333;">Hello, ${post_data.full_name}!</h1>
                            <p style="margin: 0 0 20px; font-size: 16px; color: #333333;">If you've got this email, it means that someone thinks very highly of you. ${post_data.inviting_member_name} invited you to join the nSight family, an exclusive tribe of thinkers, dreamers, and doers.</p>
                            <p style="margin: 0 0 20px; font-size: 16px; color: #333333;">Your username is: ${post_data.username}<br>Your password is: ${post_data.password}</p>
                            <a href="https://www.nsight.vip/" style="display: inline-block; padding: 10px 20px; margin: 0 0 20px; background-color: #f6e232; color: #272727; text-decoration: none; border-radius: 5px;">Login</a>
                            <p style="margin: 0; font-size: 16px; color: #333333;">See you on the other side.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #000000; color: #ffffff;">
                            <p style="margin: 0; font-size: 14px;">&copy; ${new Date().getFullYear()} nSight. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    const msg = {
      From: "info@nsight.online",
      To: post_data.email,
      Subject: "Welcome to the nSight Family",
      HtmlBody: body,
      TextBody: "Welcome to the nSight Family",
      TrackOpens: true,
      MessageStream: "outbound",
    };

    try {
      // const response = await $fetch("https://api.postmarkapp.com/email", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "X-Postmark-Server-Token": process.env.POSTMARK_SERVER_TOKEN,
      //   },
      //   body: JSON.stringify(msg),
      // });

      // console.log("Email sent successfully:", response);

      client.sendEmail(msg);

      return {
        statusCode: 200,
        // data: `Email sent successfully: ${JSON.stringify(response)}`,
        data: `Email sent successfully`,
      };
    } catch (error) {
      console.error("Failed to send email:", error);
      return {
        statusCode: 500,
        data: `Failed to send email: ${error.message}`,
      };
    }
  }
});

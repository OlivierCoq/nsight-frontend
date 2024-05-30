import sgMail from '@sendgrid/mail';
import qs from "qs";
import crypto from 'crypto'



const config = useRuntimeConfig(), api_key = config.public.SENDGRID_API_KEY

sgMail.setApiKey(api_key);

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);


  console.log('post_data', post_data);

  if (!post_data) {
    return { status: 'error', message: 'Invalid data' };
  } else {

      // Find user in database
      const headers_obj = {
        "Content-Type": "application/json",
        accept: "application/json"
      };

      await $fetch(
        `${config.public.NUXT_STRAPI_URL}/api/users?${qs.stringify({
          filters: {
            email: post_data.email,
          },
        })}`,
        {
          method: "GET",
          headers: headers_obj,
        }
      )
      .then(async (user_data) => { 
        // console.log('user_data', user_data)

        if(!user_data.length) {
          return { status: 'error', message: 'User not found with provided email.' };
        } else {

          
          const generateSecureToken = (length = 48) => {
            return crypto.randomBytes(length).toString('hex')
          }

          const token = generateSecureToken()
            // console.log('secure token: ', token)

            // Update user with secure token
            const token_headers_obj = {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`,
            };

            await $fetch(
              `${config.public.NUXT_STRAPI_URL}/api/users/${user_data[0].id}`,
              {
                method: "PUT",
                headers: token_headers_obj,
                body: JSON.stringify({
                  reset_hash: token
                }),
              }


              

            )
            .then(async (updated_user) => {

              // IN 30 minutes, delete the token from user:
              setTimeout(async () => {
                await $fetch(
                  `${config.public.NUXT_STRAPI_URL}/api/users/${updated_user.id}`,
                  {
                    method: "PUT",
                    headers: token_headers_obj,
                    body: JSON.stringify({
                      reset_hash: ''
                    }),
                  }
                )
              }, 1800000)

              // console.log('updated_user', updated_user)
                // return false
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
                                              <h1 style="margin: 0 0 20px; font-size: 24px; color: #333333;">Hello, ${updated_user.first_name} ${updated_user.last_name}!</h1>
                                              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Please click here to reset your password. This link will expire in 30 minutes.</p>
                                              <a href="${process.env.LOCAL_URL}/reset-password?token=${updated_user.reset_hash}" style="display: inline-block; padding: 10px 20px; margin: 0 0 20px; background-color: #f6e232; color: #272727; text-decoration: none; border-radius: 5px;">Login</a>
                                              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">If you did not request a password reset, please ignore this email.</p>                                              
                                              <p style="margin: 0; font-size: 16px; color: #333333;">See you on the other side.</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center" style="padding: 20px; background-color: #000000; color: #ffffff;">
                                              <p style="margin: 0; font-size: 14px;">&copy; ${ new Date().getFullYear() } nSight. All rights reserved.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </body>
                  </html>`;

                  const msg = {
                    to: post_data.email,
                    from: 'info@nsightapi.vip',
                    subject: 'Reset your nSight password',
                    text: `Let's get it!`,
                    html: body,
                  };




                  try {
                    await sgMail.send(msg);
                    return { status: 'success', message: 'Email sent successfully' };
                  } catch (error) {
                    console.error(error);
                    return { status: 'error', message: 'Failed to send email', error };
                  }


      
             })
            .catch((error) => {
              console.log('error', error)
              return { status: 'error', message: 'Failed to update user' };
            });

        }
      })

  }
});

import postmark from "postmark";
const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN);

import qs from "qs";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  let return_data = {};

  console.log("post_data", post_data);
  // return false

  if (!post_data) {
    return_data = {
      statusCode: 403,
      data: {
        error: "Invalid data",
      },
    };
    return return_data;
  } else {
    try {
      // Find user in database
      const headers_obj = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`,
      };

      await $fetch(
        `${config.public.NUXT_STRAPI_URL}/api/users?${qs.stringify({
          filters: {
            reset_hash: post_data.code,
          },
        })}`,
        {
          method: "GET",
          headers: headers_obj,
        },
      )
        .then(async (user_data) => {
          // console.log('user_data', user_data)
          if (!user_data.length) {
            console.log("user not found");
            return_data = {
              statusCode: 403,
              data: {
                error: "User not found with provided reset code.",
              },
            };
            return return_data;
          } else {
            // Update user with new password
            const update_headers_obj = {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${process.env.CUSTOM_PW_RESET_TOKEN}`,
            };

            await $fetch(
              `${config.public.NUXT_STRAPI_URL}/api/users/${user_data[0].id}`,
              {
                method: "PUT",
                headers: update_headers_obj,
                body: JSON.stringify({
                  password: post_data.password,
                }),
              },
            ).then(async () => {
              return_data = {
                statusCode: 200,
                message: "Password updated successfully.",
              };

              // Remove reset code from user
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
                    reset_hash: "",
                  }),
                },
              )
                .then(async () => {
                  console.log("reset code removed");
                  return_data = {
                    statusCode: 200,
                    data: {
                      message: "Password updated successfully.",
                    },
                  };
                  return return_data;
                })
                .catch((error) => {
                  console.log("error removing reset code");
                  return_data = {
                    statusCode: 403,
                    data: {
                      error: `Error: ${error}. Reset code not removed.`,
                    },
                  };
                  return return_data;
                });
            });
            return return_data;
          }
        })
        .catch((error) => {
          console.log("error finding user");
          return_data = {
            statusCode: 403,
            data: {
              error: `Error: ${error}. User not found with provided reset code.`,
            },
          };
          return return_data;
        });
    } catch (error) {
      console.log("error updating user");
      return_data = {
        statusCode: 403,
        data: {
          error: `Error: ${error}. User not found with provided reset code.`,
        },
      };
    }

    return return_data;
  }
});


export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);

  console.log('Add new friend POST data', post_data);

      $fetch(
        `${process.env.STRAPI_URL}/api/users/${post_data?.user.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${post_data?.token}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(post_data?.user),
        }
      )
        .then((res) => {
          console.log("Updated nSight user.");
        })
        .catch((err) => {
          console.log("Update user error", err);
        });


  return { 
    status: 'success', 
    message: 'User updated successfully'
  };

});
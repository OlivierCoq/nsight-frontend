
export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);

  console.log('Add new friend POST data', post_data);

      // $fetch(
      //   `${process.env.STRAPI_URL}/api/users/${this.user.id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       Authorization: `Bearer ${this.token}`,
      //       "Content-Type": "application/json",
      //       accept: "application/json",
      //     },
      //     body: JSON.stringify(this.user),
      //   }
      // )
      //   .then((res) => {
      //     console.log("Updated nSight user.");
      //   })
      //   .catch((err) => {
      //     console.log("Update user error", err);
      //   });


  return { 
    status: 'success', 
    message: post_data
  };

});
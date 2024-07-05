const config = useRuntimeConfig()


export default defineEventHandler(async (event) => {

  const headahs = event?.req?.headers
  // console.log('headdas', headahs)

  const post_data = await readBody(event),
       update_user = async (user: object) => {
        await $fetch(`${process.env.STRAPI_URL}/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: headahs.authorization
          },
          body: JSON.stringify(user)
        }).then((response) => {
          // console.log("User updated: ", response);
        }).catch((error) => {
          // console.error('Error updating user: ', error);
        });
      }

  // console.log('Send Message post Data', post_data)

  await $fetch(`${process.env.STRAPI_URL}/api/users/${post_data.participant_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: headahs.authorization
    },
  }).then(async (friend) => {
    // console.log("Member: ", friend.username);

    const existing_conversation = friend.chats.data.find(conv => conv.id == post_data.conversation.id)
    if(existing_conversation) {
      
      friend.chats.data.splice(friend.chats.data.indexOf(existing_conversation), 1, post_data.conversation)
      // console.log('conversations exists. Replacing: ', friend.chats.data)
      await update_user(friend)
    } else {
      friend.chats.data.push(post_data.conversation)
      await update_user(friend)
    }
    
  }).catch((error) => {
    console.error('Error updating user: ', error);
  })


})
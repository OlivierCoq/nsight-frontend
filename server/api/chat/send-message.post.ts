const config = useRuntimeConfig()


export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);


  const recipient = post_data.recipient, message = post_data.send, auth = post_data.auth

  const conversation = recipient.chats.data.find((chat) => {
    return chat.participants.includes(auth.user.id) && chat.participants.includes(recipient.id)
  })

  const local_conversation = auth.user.chats.data.find((chat) => {
    return chat.participants.includes(auth.user.id) && chat.participants.includes(recipient.id)
  })

  if (!conversation) {
    recipient.chats.data.push({
      participants: [auth.user.id, recipient.id],
      messages: [message]
    })
  } else {
    conversation.messages.push(message)
  }

  if (!local_conversation) {
    auth.user.chats.data.push({
      participants: [auth.user.id, recipient.id],
      messages: [message]
    })
  } else {
    local_conversation.messages.push(message)
  }



  // console.log('updated recipient', recipient.chats.data[0].messages)


  $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${recipient.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${auth.token}`
    },
    body: JSON.stringify(recipient)
  })
  .then(async (response) => {
    console.log('Updated Recipient User', response)
    

    $fetch(`${config.public.NUXT_STRAPI_URL}/api/users/${auth.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(auth.user)
    }).then(async (response) => {
      console.log('Updated Auth User', response)

      
    })
    .catch((error) => {
      console.error('Error updating Strapi User', error)
    })


  })
  .catch((error) => {
    console.error('Error updating Strapi User', error)
  })

})
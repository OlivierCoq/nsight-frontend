
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log('message webhook', post_data);

  // if(post_data?.entry?.id === )

  return {
    data: 'message fired!'
  }
}) 
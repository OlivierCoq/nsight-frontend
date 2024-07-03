
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log('post_data', post_data);
  return {
    status: 200,
    data: post_data
  }
})
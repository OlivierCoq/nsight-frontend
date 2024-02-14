export default defineEventHandler(async (event) => {
  // body

  const post_data = await readBody(event);

  return {
    status: 200,
    data: post_data,
  };
});

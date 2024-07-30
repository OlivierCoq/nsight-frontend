
export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);

  console.log('Add new friend POST data', post_data);
  return { 
    status: 'success', 
    message: post_data
  };

});
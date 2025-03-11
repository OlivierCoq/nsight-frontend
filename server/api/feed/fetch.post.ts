export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("body", post_data); 

  let feed_arr: any[] = [];

  try {

    





  }
  catch {
    return  { 
      status: 500,
      data: [],
      message: "Error"
    }
  }
  finally {
    return  { 
        status: 200,
        data: feed_arr
      }
  }
});
export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);



  console.log('from front end', post_data);
  
  interface StatusMessage {
    status: string | null,
    message: string | null
  }

  let return_obj = {
    status: null,
    message: null
  } as StatusMessage;

  if(post_data?.new_password !== post_data?.confirm_password) {
    return_obj.status = 'error';
    return_obj.message = 'Passwords do not match';
  } else if(post_data?.current_password !== post_data?.auth.user.password) {
      return_obj.status = 'error';
      return_obj.message = 'Current password is incorrect.';

      // fetch won't work, even with correct password. weird.
    // await $fetch(
    //   `${process.env.STRAPI_URL}/api/auth/local`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       identifier: post_data?.email,
    //       password: post_data?.current_password
    //     })
    //   }).then(async (res) => {
    //       // update password: 
    //       console.log('update password', res);
    //     return_obj.status = 'success';
    //     return_obj.message = 'update password'
    //   }).catch((err) => {
    //     console.log('update password error', err);
    //     return_obj.status = 'error';
    //     return_obj.message = `Current password is incorrect.`;
    //   }) 
    } else {
      return_obj.status = 'success';
      return_obj.message = 'Clear to update password';
  }
  return return_obj;

})
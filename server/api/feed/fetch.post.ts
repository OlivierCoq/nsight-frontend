import qs from 'qs';
const api_root = `${process.env.STRAPI_URL}/api`;

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  // console.log("body", post_data); 

  const friends = post_data?.user?.friends;

  try {
    let feed_arr: any[] = [];

    // Fetch regular posts
    const fetchPosts = async () => {
      const posts_response = await $fetch(`${api_root}/posts?${qs.stringify({
        populate: [
          'title',
          'users_permissions_user',
          'users_permissions_user.nsight_id',
          'users_permissions_user.profile_picture',
          'pics',
          'caption',
          'visible',
          'profile',
          'tags',
          'reactions',
          'external_links',
          'comments',
          'comments.comments',
          'comments.comments.commenter',
          'comments.comments.commenter.nsight_id',
          'comments.comments.replies',
          'comments.comments.replies.user',
          'comments.comments.replies.user.nsight_id',
          'images',
        ],
        filters: {
          nsight_id: {
            $in: friends
          }
        },
        sort: 'createdAt:desc',
        pagination: {
          page: 1,
          pageSize: 10
        }
      })}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${post_data.token}`
        }
      });

      feed_arr = [...feed_arr, ...posts_response.data];
      console.log("feed_arr", feed_arr);
    };

    // Fetch picture posts
    const fetchPicturePosts = async () => {
      const posts_response = await $fetch(`${api_root}/picture-posts?${qs.stringify({
        populate: [
          'title',
          'data',
          'users_permissions_user',
          'users_permissions_user.nsight_id',
          'users_permissions_user.profile_picture',
          'pics',
          'caption',
          'visible',
          'profile',
          'tags',
          'reactions',
          'external_links',
          'comments',
          'comments.comments',
          'comments.comments.commenter',
          'comments.comments.commenter.nsight_id',
          'comments.comments.replies',
          'comments.comments.replies.user',
          'comments.comments.replies.user.nsight_id',
          'images',
        ],
        filters: {
          nsight_id: {
            $in: friends
          }
        },
        sort: 'createdAt:desc',
        pagination: {
          page: 1,
          pageSize: 10
        }
      })}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${post_data.token}`
        }
      });

      feed_arr = [...feed_arr, ...posts_response.data];
      console.log("feed_arr", feed_arr);
    };


    // Call the fetchPosts function and wait for it to complete
    await fetchPosts();
    await fetchPicturePosts();

    // Return the response only after all fetch calls are completed
    if (feed_arr.length) {
      return {
        status: 200,
        data: feed_arr,
        message: "Successfully fetched feed"
      };
    } else {
      return {
        status: 204,
        data: [],
        message: "No content"
      };
    }
  } catch (error) {
    console.error("Error fetching feed:", error);
    return {
      status: 500,
      data: [],
      message: "Error"
    };
  }
});
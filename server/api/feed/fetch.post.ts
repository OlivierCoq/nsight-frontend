import qs from 'qs';
const api_root = `${process.env.STRAPI_URL}/api`;

export default defineEventHandler(async (event) => {
  const post_data = await readBody(event);
  console.log("body", post_data?.tag); 

  const friends = post_data?.user?.friends
  let popular_tags: any[] = []

  try {
    let feed_arr: any[] = []
        

    let query = {
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
      }

      if(post_data?.tag) {
        query.filters['tags'] = {
            tag_name: {
              $eq: post_data?.tag
            }
          }
      }

    // Fetch regular posts
    const fetchPosts = async () => {
      const posts_response = await $fetch(`${api_root}/posts?${qs.stringify(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${post_data.token}`
        }
      });
      posts_response.data.forEach((post: any) => { 
        post.type = 'post';
        if(post.tags && post.tags.length) {
          post.tags.forEach((tag: any) => {
            if(!popular_tags.includes(tag.tag_name)) {
              tag['count'] = 1;
              popular_tags.push(tag);
            } else {
              let index = popular_tags.findIndex((t: any) => t.tag_name === tag.tag_name);
              popular_tags[index].count++;
            }
          });
        }
      });
      feed_arr = [...feed_arr, ...posts_response.data];
      // console.log("feed_arr", feed_arr);

      // Filter by tag
      if(post_data?.tags) {
        feed_arr = feed_arr.filter((post: any) => {
          return post.tags.some((tag: any) => post_data.tag === tag.tag_name);
        });
      }



    };

    let picture_query = {

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
      }

    if(post_data?.tag) {
        picture_query.filters['tags'] = {
            tag_name: {
              $eq: post_data?.tag
            }
          }
      }

    // Fetch picture posts
    const fetchPicturePosts = async () => {
      const posts_response = await $fetch(`${api_root}/picture-posts?${qs.stringify(picture_query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${post_data.token}`
        }
      });

      posts_response.data.forEach((post: any) => { 
        post.type = 'picture-post';
        if(post.tags && post.tags.length) {
          post.tags.forEach((tag: any) => {
            if(!popular_tags.includes(tag.tag_name)) {
              tag['count'] = 1;
              popular_tags.push(tag);
            } else {
              let index = popular_tags.findIndex((t: any) => t.tag_name === tag.tag_name);
              popular_tags[index].count++;
            }
          });
        }
      });
      feed_arr = [...feed_arr, ...posts_response.data];
      // console.log("feed_arr", feed_arr);
    };

    // Randomize order of feed_arr
    const randomize = async () => {
      feed_arr = feed_arr.sort(() => Math.random() - 0.5); 
      await rankByUpvotes(feed_arr);
    } 

    // Sort feed_arr by post.reactions.upvotes:
    const rankByUpvotes = async (arr: any) => {
      let new_arr = arr
      feed_arr = await new_arr.sort((a, b) => (a.reactions.upvotes < b.reactions.upvotes) ? 1 : -1);
      await rankByDate(feed_arr);
    }

    // Then sort new feed_arr by post.createdAt. So highest ranking, AND newest posts are at the top.
    const rankByDate = async (arr: any) => {
      let new_arr = arr;
      feed_arr = await new_arr.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);
      await rankByComments(new_arr);
    }

    // Sort by highest number of post.comments.comments.length
    const rankByComments = async (arr: any) => {
      feed_arr = await arr.sort((a, b) => (a.comments.comments.length < b.comments.comments.length) ? 1 : -1);
      // await rankByReplies(feed_arr);
    } 

    // Sort by highest number of post.comments.comments.replies.length
    const rankByReplies = async (arr: any) => {
      feed_arr = await arr.sort((a, b) => (a.comments?.comments?.replies?.length > b.comments?.comments?.replies?.length) ? 1 : -1);
    }

    // rank tags by count
    const rankTags = async (arr: any) => {
      popular_tags = popular_tags.sort((a, b) => (a.count < b.count) ? 1 : -1);
    }
    // Call the fetchPosts function and wait for it to complete
    await fetchPosts();
    await fetchPicturePosts();
    await randomize();
    await rankTags(popular_tags);
    
    



    // Return the response only after all fetch calls are completed
    if (feed_arr.length) {
      return {
        status: 200,
        data: feed_arr,
        popular_tags: popular_tags,
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
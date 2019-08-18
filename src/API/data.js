export const getPosts = async () => {
  const response = await fetch('https://simple-blog-api.crew.red/posts');

  return response.json();
};
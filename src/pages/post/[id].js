import styled from 'styled-components';
import Page from '../../components/Page';

// const Post = styled.div`
//   padding: 16px;
//   margin: 16px;
//   border-radius: 16px;
//   box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
// `;

const Post = ({ post, user }) => {
  return (
    <Page pageTitle={`${post.title} | The Petz Posts`}>
      <h2>{post.title}</h2>
      <p>{user.name}</p>
      <p>{post.body}</p>
    </Page>
  )
}

export const getServerSideProps = async ({params}) => {
  const postId = params.id;
  try {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await postRes.json();
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const user = await userRes.json();

    return {
      props: {
        post,
        user,
      }
    };
  } catch(reqError) {
    return {
      props: {
        reqError,
      }
    };
  }
};

export default Post;

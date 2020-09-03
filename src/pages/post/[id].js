import styled from 'styled-components';
import Page from '../../components/Page';

const PostWrapper = styled.div`
  margin: 0 auto;
  max-width: 560px;
`;

const PostTitle = styled.h2`
  margin: 16px 0;

  &:first-letter {
    text-transform: capitalize;
  }
`;

const Author = styled.p`
  margin: 0;
  font-weight: 600;
`;

const PostBody = styled.p`
  margin: 24px 0 16px;
`;

const Post = ({ post, user }) => {
  return (
    <Page pageTitle={`${post.title} | The Petz Posts`}>
      <PostWrapper>
        <PostTitle>{post.title}</PostTitle>
        <Author>{user.name}</Author>
        <PostBody>{post.body}</PostBody>
      </PostWrapper>
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

import styled from 'styled-components';
import Router from 'next/router';
import Page from '../../components/Page';

const BackButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 8px 0;
  padding: 0 16px;
  border: 0;
  border-radius: 40px;
  background-color: #f6f6f6;
  cursor: pointer;
  transition: all 200ms ease-out;
  outline: none;

  &:before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-left: -16px;
    background: url('/back-icon.svg') no-repeat;
    background-size: 18px auto;
    background-position: center;
    transition: all 200ms ease-out;
  }

  &:hover {
    &:before {
      width: 48px;
    }
  }
`;

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
      <BackButton onClick={() => Router.back()}>Go Back</BackButton>
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

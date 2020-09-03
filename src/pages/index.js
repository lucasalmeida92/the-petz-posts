import styled from 'styled-components';
import Page from '../components/Page';
import { normalizeById } from '../helpers/normalize';

const PostsWrapper = styled.div`
  margin: 0 auto;
  max-width: 560px;
`;

const Post = styled.div`
  padding: 16px;
  margin: 16px 0;
  border-radius: 16px;
  box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
`;

const PostTitle = styled.h2`
  margin: 0 0 16px;
`;

const Author = styled.p`
  margin: 0;
`;

const Home = ({ postsData, normalizedUsers }) => {
  return (
    <Page>
      <PostsWrapper>
        { !postsData.error
          ? postsData.posts.map(post => (
            <Post key={post.id}>
              <PostTitle>
                <a href={`/post/${post.id}`} title={post.title}>{post.title}</a>
              </PostTitle>
              <Author>{normalizedUsers[post.userId].name}</Author>
            </Post>
          ))
          : <p>Can't load posts</p>
        }
      </PostsWrapper>
    </Page>
  )
}

export const getServerSideProps = async () => {
  try {
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const posts = await postsRes.json();
    const usersRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await usersRes.json();
    const normalizedUsers = normalizeById(users);

    return {
      props: {
        postsData: { posts },
        normalizedUsers,
      }
    };
  } catch(error) {
    return {
      props: {
        postsData: { error },
      }
    };
  }
};

export default Home;

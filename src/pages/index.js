import styled from 'styled-components';
import Page from '../components/Page';
import { normalizeById } from '../helpers/normalize';

const Post = styled.div`
  padding: 16px;
  margin: 16px 0;
  border-radius: 16px;
  box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
`;

const Home = ({ postsData, normalizedUsers }) => {
  return (
    <Page>
      { !postsData.error
        ? postsData.posts.map(post => (
          <Post key={post.id}>
            <h2><a href={`/post/${post.id}`} title={post.title}>{post.title}</a></h2>
            <p>{normalizedUsers[post.userId].name}</p>
          </Post>
        ))
        : <p>Can't load posts</p>
      }
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

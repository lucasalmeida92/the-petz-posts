import styled from 'styled-components';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';
import { normalizeById } from '../helpers/normalize';

const PostsWrapper = styled.div`
  margin: 0 auto;
  max-width: 560px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

const AuthorsFilter = styled.select`
  border: 0;
  background-color: #eeee;
  border-radius: 16px;
  padding: 4px 8px;
  margin: 12px 8px;
  box-shadow: 0 0 0 8px #eee;
  outline: none;
`;

const Post = styled.div`
  position: relative;
  padding: 16px;
  margin: 16px 0;
  border-radius: 16px 16px 21px 16px;
  box-shadow: 0 0 5px 1px rgba(0,0,0,.08);
  transition: all 200ms ease-out;

  &:hover {
    box-shadow: 0 0 10px 1px rgba(0,0,0,.14);
  }
`;

const PostTitle = styled.h2`
  margin: 0 0 16px;

  &:first-letter {
    text-transform: capitalize;
  }
`;

const Author = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  padding-right: 100px;
  line-height: 15px;

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    margin-right: 4px;
    flex-shrink: 0;
    background: url('/user-icon.svg') no-repeat;
    background-size: 100% auto;
    background-position: center;
  }
`;

const DeleteButton = styled.button`
  overflow: hidden;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  max-width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 40px;
  background-color: #f6f6f6;
  opacity: .5;
  cursor: pointer;
  transition: all 200ms ease-out;
  outline: none;

  &:before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    background: url('/delete-icon.svg') no-repeat;
    background-size: 18px auto;
    background-position: center;
  }

  &:after {
    content: 'Delete';
    display: inline-block;
    padding-right: 16px;
  }

  &:hover {
    max-width: 200px;
    opacity: .8;
  }
`;

const Home = ({ byAuthor, postsData, normalizedUsers }) => {
  const router = useRouter();

  const filterByAuthor = e => {
    if(e.target.value != 0) {
      router.push(`/?byAuthor=${e.target.value}`);
    } else {
      router.push(`/`);
    }
  }

  const handleDeletePost = async (e, postId) => {
    const postEl = e.target.parentNode;

    NProgress.start();

    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });

      // postEl.remove();
      postEl.style.display = 'none';
    } catch(error) {
      console.log(error);
    }

    NProgress.done();
  }

  return (
    <Page>
      <PostsWrapper>
        <Filters>
          <AuthorsFilter onChange={filterByAuthor} value={byAuthor}>
            <option value="0">All Authors</option>
            {Object.values(normalizedUsers).map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </AuthorsFilter>
        </Filters>
        { !postsData.error
          ? postsData.posts.map(post => (
            <Post key={post.id}>
              <PostTitle>
                <a href={`/post/${post.id}`} title={post.title}>{post.title}</a>
              </PostTitle>
              <Author>{normalizedUsers[post.userId].name}</Author>
              <DeleteButton onClick={(e) => handleDeletePost(e, post.id)}/>
            </Post>
          ))
          : <p>Can't load posts</p>
        }
      </PostsWrapper>
    </Page>
  )
}

export const getServerSideProps = async ({ query }) => {
  try {
    const postsApiUrl = query.byAuthor
      ? `https://jsonplaceholder.typicode.com/posts?userId=${query.byAuthor}`
      : `https://jsonplaceholder.typicode.com/posts`;
    const postsRes = await fetch(postsApiUrl);
    const posts = await postsRes.json();
    const usersRes = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await usersRes.json();
    const normalizedUsers = normalizeById(users);

    return {
      props: {
        byAuthor: query.byAuthor || 0,
        postsData: { posts },
        normalizedUsers,
      }
    };
  } catch(error) {
    return {
      props: {
        byAuthor: query.byAuthor || 0,
        postsData: { error },
      }
    };
  }
};

export default Home;

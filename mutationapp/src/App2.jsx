import { useQuery, useMutation, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Loader2, FileText, Send } from "lucide-react";

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  if(!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다');
  return response.json();
}

const createPost = async ({ title, body }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, body, userId: 1 }),
    headers: { 'Content-Type' : 'application/json; charset=UTF=8' }
  });
  return response.json();
}

const queryClient = new QueryClient();

function PostApp() {
  const client = useQueryClient();

  const { isLoading, error, data: posts } = useQuery({
    queryKey: ['post'],
    queryFn: getPosts
  });

  const createMutate = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      client.invalidateQueries(['posts']);
      console.log(`포스트 발급 완료 : ${newPost}`);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');

    if(!title || !content)return;

    createMutate.mutate({ title, body: content });

    e.currentTarget.reset();
  }

  return(
    <>
      <div>
        <header>
          <h1>
            <FileText /> JSON Placeholder Posts
          </h1>
          <p>React Query 활용 데이터 관리 예제</p>
        </header>
        {/** POST 작성 부분 */}
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">제목</label>
              <input
                name="title"
                type="text"
                placeholder='제목을 입력하세요 !'
                required
              />
            </div>
            <div>
              <label>내용</label>
              <textarea 
                name="content"
                rows = '3'
                placeholder='내용을 입력하세요 !'
                required
              ></textarea>
            </div>
            <button
              type='submit'
              disabled={createMutate.isPending}
            >
              {
                createMutate.isPending ? (
                  <Loader2 />
                ) : (
                  <Send />
                )}
                {createMutate.isPending ? '전송 중...' : '포스트 작성하기' }
            </button>
          </form>
        </section>

        {/** 포스트 목록 출력 */}
        <section>
          <h2>
            <PlusCircle />
            Current Posts
          </h2>

          { isLoading ? (
            <div>
              <Loader2 />
              <p>데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div>오류가 발생했습니다 : {error.message}</div>
          ) : (
            <div>
              {posts.map(post=>(
                <div 
                  key = {post.id}
                >
                  <span>Post : # {post.id}</span>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <PostApp />
    </QueryClientProvider>
  )
}

export default App
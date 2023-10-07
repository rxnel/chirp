import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

import { RouterOutputs, api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();
  console.log(user);
  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <img
        src={user.imageUrl}
        alt="Profile image"
        className="h-14 w-14 rounded-full"
      />
      <input
        placeholder="Type some emojis"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
      <img src={author.profileImageUrl} className="h-14 w-14 rounded-full" />
      <div className="flex flex-col">
        <div className="flex">
          <span>{`@${author.username}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

export default function Home() {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const user = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl ">
          <div className="justify-center border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}
            {!!user.isSignedIn && (
              <div>
                <CreatePostWizard />
                <SignOutButton />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {data?.map((fullPost) => (
              <PostView {...fullPost} key={fullPost.post.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

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
                <SignOutButton />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            {data?.map((post) => (
              <div key={post.id} className="border-b border-slate-400 p-8">
                {post.content}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

import Header from "@/app/components/Header";
import Form from "@/app/components/Form";
import PostFeed from "@/app/components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home"/>
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
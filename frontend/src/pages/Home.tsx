import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Link to={"post-query"}>Post Query</Link>
      <Link to={"messaging"}>Messaging</Link>
      <Link to={"customer-queries"}>Customer Queries</Link>
      <Link to={"agent-queries"}>Agent Queries</Link>
    </div>
  );
};

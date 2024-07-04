import { useEffect, useState } from "react";
import { AgentQuery, getAgentQueries } from "../../api/queriesApi";

export const AgentQueries = () => {
  const [agentQueries, setAgentQueries] = useState<Array<AgentQuery>>([]);

  useEffect(() => {
    const _init = async () => {
      setAgentQueries((await getAgentQueries("123")).data);
    };
    _init();
  }, []);

  return (
    <div>
      <h1>Agent queries</h1>
      <div className='flex flex-col w-full mt-3 px-2 items-center justify-center'>
        <div className='h-[1px] w-[80%] bg-black' />
        <div className='flex w-[80%] justify-between'>
          <h1 className='max-w-8'>Id</h1>
          <h1 className='max-w-32'>Description</h1>
          <h1 className='max-w-32'>Date</h1>
          <h1 className='max-w-32'>Customer</h1>
          <h1 className='max-w-32'>Action</h1>
        </div>
        <div className='h-[1px] w-[80%] bg-black' />
        {agentQueries?.map((item, index) => (
          <div
            className='flex w-[80%]  justify-between rounded-md my-2 px-2 bg-slate-200 z-20 shadow-md'
            key={index}
          >
            <h2 className='max-w-8'>{item.id}</h2>
            <h2 className='max-w-32'>{item.description || "-"}</h2>
            <h2 className='max-w-32'>{item.date || "-"}</h2>
            <h2 className='max-w-32'>{item.customer || "-"}</h2>
            <h2 className='max-w-32 cursor-pointer underline'>Open Chat</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

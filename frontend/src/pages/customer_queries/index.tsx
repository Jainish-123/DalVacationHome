import { useEffect, useState } from "react";
import { getCustomerQueries, Query } from "../../api/queriesApi";
import { Link } from "react-router-dom";

export const CustomerQueries = () => {
  const [customerQueries, setCustomerQueries] = useState<Array<Query>>([]);

  useEffect(() => {
    const _init = async () => {
      setCustomerQueries((await getCustomerQueries("123")).data);
    };
    _init();
  }, []);

  return (
    <div>
      <h1>Customer queries</h1>
      <div className='flex flex-col w-full mt-3 px-2 items-center justify-center'>
        <div className='h-[1px] w-[80%] bg-black' />
        <div className='flex w-[80%] justify-between'>
          <h3 className='max-w-8'>Id</h3>
          <h3 className='max-w-32'>Description</h3>
          <h3 className='max-w-32'>Date</h3>
          <h3 className='max-w-32'>Agent</h3>
          <h3 className='max-w-32'>Action</h3>
        </div>
        <div className='h-[1px] w-[80%] bg-black' />
        {customerQueries?.map((item, index) => (
          <div
            className='flex w-[80%]  justify-between rounded-md my-2 px-2 bg-slate-200 z-20 shadow-md'
            key={index}
          >
            <h5 className='max-w-8'>{item.id}</h5>
            <h5 className='max-w-32'>{item.description || "-"}</h5>
            <h5 className='max-w-32'>{item.date || "-"}</h5>
            <h5 className='max-w-32'>{item.agentId || "-"}</h5>
            <Link to={"/messaging/" + item.customerId + "/" + item.agentId}>
              <h5 className='max-w-32 cursor-pointer underline'>Open Chat</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

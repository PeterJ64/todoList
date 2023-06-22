import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodoItems, useAddTodoItems, useUpdateStatus, useDeleteItem } from "../api/post";
import { useForm } from "react-hook-form";
import done from '/done.png';
import trash from '/trash.png';
import { z } from "zod";

interface Todo {
  id: string;
  name: string;
}


const todoSchema = z.object({
  deadline: z.string(),
  text: z.string(),
  title: z.string(),

});

type FormData = z.infer<typeof todoSchema>;

const Todo = () => {
  const [filteredItems, setFilteredItems] = useState<Todo[]>([]);
  const { id } = useParams();
  const [status, setStatus] = useState<string>("all");
  const { mutate } = useAddTodoItems();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: updateStatus } = useUpdateStatus();
  const { mutate: deleteItem } = useDeleteItem();

  const { data } = useQuery({
    queryKey: ["todoItems"],
    queryFn: getTodoItems
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredItems(filteredData);
    }
  }, [data]);

  const filteredData = data?.filter((item: any) => item.todoListId === id);

  const handleDate = (date: any) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString();
    const formattedTime = newDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    if (formattedDate !== "Invalid Date") {
      return (
        <span>Deadline: {formattedDate} {formattedTime}</span>
      );
    }
  }

  const handleStatusChange = (newStatus: string) => {
    let finishedStatus: boolean;
    if (newStatus == "finished") {
      finishedStatus = true;
    } else if (newStatus == "active") {
      finishedStatus = false;
    }
    if (newStatus != "all") {
      const findItems = filteredData.filter((item: any) => item.finished == finishedStatus);
      setFilteredItems(findItems);
    } else {
      setFilteredItems(filteredData);
    }
    setStatus(newStatus);
  }

  const submitData = (data: FormData) => {
    try {
      todoSchema.parse(data); 
      mutate({
        deadline: data.deadline,
        text: data.text,
        title: data.title,
        finished: false,
        todoListId: id
      });
      reset();
    } catch (error) {
      console.error("Validation error:", error);
    }
  }

  return (<>
<div className="mx-auto " >
  
  <div className="border-r  border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 
  bg-neutral text-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal " style={{maxWidth:'600px'}}>
    <div className="mb-8">
      
      <h1 className="card-title">Create a new item</h1>
        <div className="card-body text-center">
          <form onSubmit={handleSubmit(submitData)}>
            <div className="flex flex-col">
              <input
                className="bg-slate-100 text-black rounded-md p-4 m-4"
                type="text"
                placeholder="New task name"
                {...register("title")}
              />

              <input
                className="bg-slate-100 text-black rounded-md p-4 m-4"
                type="text"
                placeholder="Text"
                {...register("text")}
              />

              <div className="flex items-center">
                <input
                  className="rounded-md text-black p-4 m-4"
                  type="datetime-local"
                  {...register("deadline")}
                />
                <button className="bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600 hover:border-transparent">
                  Add task
                </button>
              </div>
              <h5 style={{ marginRight: '0.5rem', opacity: '0.6'}} className="mt-8 ">Search</h5>
              <div>
                <input
                  
                  className="rounded-md text-black p-4 mt-4 "
                  type="text"
                  id="categoryInput"
                  placeholder="Item title"
                  onChange={(event) => {
                    const searchString = event.target.value.toLowerCase();
                    const filterAlbums = filteredData?.filter((item: any) => item.title.toLowerCase().includes(searchString));
                    setFilteredItems(filterAlbums);
                  }}
                />
              </div>

            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <button className={status == "all" ? "m-2  text-sm bg-dark bg-yellow-300 hover:border-transparent" : "m-2 text-sm hover:border-transparent"} onClick={() => handleStatusChange("all")} style={{ color: 'black' }}>All</button>
          <button className={status == "finished" ? "m-2 bg-yellow-300 text-sm hover:border-transparent" : "m-2 text-sm hover:border-transparent"} onClick={() => handleStatusChange("finished")} style={{ color: 'black' }}>Finished</button>
          <button className={status == "active" ? "m-2 bg-yellow-300 text-sm hover:border-transparent" : "m-2 text-sm hover:border-transparent"} onClick={() => handleStatusChange("active")} style={{ color: 'black' }}>Active</button>
        </div>
        {filteredItems?.map((item: any) => (
          <div key={item.id} style={{
            border: `4px solid ${item.finished ? 'green' : 'white'}`,
            margin: '10px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
              <p style={{ marginRight: '10px', fontWeight: 'bold' }}>Title: {item.title}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
              <div style={{ textDecoration: item.finished ? 'line-through' : 'none',  maxWidth: '80%', wordWrap: 'break-word', textAlign: 'left'  }}>  {item.text}</div>
              <div style={{ marginLeft: 'auto', width: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <img style={{ width: '24px', marginLeft: '8px', cursor: 'pointer', }} src={done} alt="Done" onClick={() => updateStatus({ id: item.id, status: !item.finished })} />
                  <img style={{ width: '24px', marginLeft: '8px', cursor: 'pointer', }} src={trash} alt="Trash" onClick={() => deleteItem(item.id)} />
                </div>
                
              </div>
            </div>
            <p style={{ textAlign: 'right',margin:'8px' }}>{handleDate(item.deadline)}</p>
          </div>
        ))}


 </div>
    
  </div>
</div>

    </>
  );
}

export default Todo;

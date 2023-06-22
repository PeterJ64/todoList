import { useForm } from "react-hook-form";
import {  useAddTodoList } from "../api/post";

const Modal = ( { show, onClose }: {show:any, onClose:any}) => {

  const {mutate} = useAddTodoList();
  const { register, handleSubmit, reset } = useForm();

  if( !show ) return null;
  const handleClose = (e:any) => {
    if(e.target.id === 'wrapper') onClose();
  }

  const submitData = (data:any) => {
    console.log(data)
    mutate(data.Name);
    reset();
    onClose();
  }



  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose} id="wrapper">
      <div className="w-[320px] flex flex-col">
        <button className="text-white text-xl place-self-end bg-transparent" onClick={() => onClose()} style={{ border: 'none' }}>
          X
        </button>
        <div className="bg-transparent p-2 rounded">

        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit((submitData))}>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Todo List name
              </label>
              <input {...register("Name")}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name"/>
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                Create
              </button>

            </div>
            </form>
          </div>
        </div>
        
      </div>
        
    </div>
  );
};

export default Modal;
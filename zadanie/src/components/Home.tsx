import { useNavigate } from 'react-router-dom'; 
import { useQuery } from "@tanstack/react-query";
import { getPosts, getTodoItems } from "../api/post";
import { AddCard } from "./AddCard";

const Home = () =>{
    
    const history = useNavigate();
    
    const postQuery = useQuery({
      queryKey: ["todos"],
      queryFn: getPosts
    });

    const {isLoading, data } = useQuery({
      queryKey: ["todoItems"],
      queryFn: getTodoItems
    });
    
    
    if( postQuery.status ==="loading") return <h1>Loading...</h1>
    if(isLoading){return <div>Loading...</div>}

    const data2 = postQuery.data.map((todo: any) => {
      const matchingItems = data.filter((item: any) => item.todoListId === todo.id);
      const texts = matchingItems.map((item: any) => item.text).slice(0, 2); 
      const showEllipsis = matchingItems.length > 2; 
      return { ...todo, texts, showEllipsis };
    });
    

    return (
      <div  style={{ width:'80%', display: 'flex', flexWrap: 'wrap',  margin: '0 auto', justifyContent: 'center'}}>
        {data2.map((item: any) => (
          <div key={item.id} className="card bg-neutral text-neutral-content my-class card-class box-shadow" onClick={() => history(`/todo/${item.id}`)}>
            <h1 className="card-title">{item.name}</h1>
            <div className="card-body text-center " style={{whiteSpace:'nowrap', overflow:'hidden',textOverflow:'ellipsis'}} >
              
              {item.texts.length > 0 ? (
                <>
                  <ul>
                    {item.texts.map((text: string, index: number) => (
                      <p key={index}>{text}</p>
                    ))}
                  </ul>
                  {item.showEllipsis && <p>...</p>} 
                </>
              ) : (<>
                <p className="truncate ...">No tasks yet ...</p>
                </>
              )}
            </div>
          </div>
        ))}
        
        <AddCard/>
      </div>
    );
  };

export default Home;
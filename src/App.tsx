
// import { useState } from "react";
import AddToCart from "./AddToCart";

export default function App() {



  // const [count, setCount] = useState(0);
  

  
  return (
    <div className="text-center my-5">
      {/* <h1 className="text-2xl">Count Is <span className="text-red-500 font-bold">{count}</span></h1>
      

       <div className="flex justify-center gap-1">
        <button onClick={() => { if (count < 1) return; setCount(count - 1)}} className="border p-2 bg-blue-500 rounded-sm cursor-pointer text-white">Decrement</button>
          <button onClick={() => setCount(count + 1)} className="border p-2 bg-blue-500 rounded-sm cursor-pointer text-white">Increment</button>
      </div> */}
      <AddToCart/>
    </div>
  );
}

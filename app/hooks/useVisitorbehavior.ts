import {useState, useEffect} from "react";

function useVisitorBehavior(){
    const[behavior, setBehabior] = useState({
        scrollDepth:0,
    });

    useEffect(()=>{
        const onScroll = () =>{
            const scrollY = window.scrollY;
            const docHeight =document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const depth = Math.min(1, (scrollY + winHeight)/docHeight);

            setBehabior(prev =>({
                ...prev,
                scrollDepth: Math.max(prev.scrollDepth, Math.round(depth*100)/100),
            }));
    
        }
        window.addEventListener("scroll",onScroll,{passive:true});
        return() => window.removeEventListener("scroll", onScroll);

    },[])

    return behavior;
    


}

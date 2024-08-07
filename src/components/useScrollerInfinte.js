import { useEffect, useState } from "react"



const useScrollerInfinte=(data)=>{
  const [showData, setShowData] = useState([]);
  const [pageValue, setPageValue] = useState(6);

  useEffect(() => {
    setShowData(data);

     setPageValue(6)
  }, [data]);

  useEffect(() => { 
    const handleScroll = () => {
      if (
        document.documentElement.scrollTop + window.innerHeight + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPageValue((prev) => prev + 5);
      }
    };
   
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return showData?.results?.filter((item) => item.type === "outlet").slice(0, pageValue);
};

export default useScrollerInfinte;



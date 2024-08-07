


const Shimmer=()=>{
        return (
            <div className="flex flex-wrap">
                {Array(12).fill('').map((_, index) => (
                    <div
                        key={index}
                        className="w-[250px] h-[200px] m-4 bg-gray-200 animate-pulse"
                    ></div>
                ))}
            </div>
        );

}



export default Shimmer
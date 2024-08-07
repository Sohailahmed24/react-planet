import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchData } from "../app/restaurantSearchSlice"
import { createSearchParams, Link, useNavigate } from "react-router-dom"





 const SearchComponent=()=>{
 const data=useSelector(state=>state.restaurantSearch.restaurantSearchObj)
    

const dispatch=useDispatch()
  const navigate=useNavigate()

useEffect(()=>{
    dispatch(fetchSearchData())
},[])








const handleNavigation=(url,searchParams={})=>{
  navigate({
    pathname:url,
    search:`?${createSearchParams(searchParams)}`
  })
}

const handleHomePageBanner=useCallback((name,url)=>{
  const bannerUrls=["banners_welcomeoffer_zeroorders",
    "banners_welcomeoffer_zeroorders",
    "banners_generic_desserts",
    "banners_generic_arabicfeast",
    "banners_generic_indian",
    "banners_generic_fastfood"
  ]
   
    if(bannerUrls.includes(name)){
      handleNavigation("/HomePageCuisine",{url})
     
   } else{
       navigate(url)  
   }
},navigate,handleNavigation)

const handleHomePageCuisine=useCallback((url)=>{
 
 
  handleNavigation("/homePageCuisine",{url})
},[handleNavigation])

const handleHomePageUsptile=useCallback((url)=>{
 handleNavigation("/homePageCuisine",{url})
},[handleNavigation])

const handleHomePageMidScroll=useCallback((name,url)=>{
  
   if(name == "homepage_midscroll_operationfalafel_20aed"){
   navigate(url)
   }else if( name !== "homepage_midscroll_minutes_jersey" && name !== "midscroll_nownow"){
     handleNavigation("/homePageCuisine",)
}
},[navigate,handleNavigation])

const bannerSection=useMemo(()=>{
  return{
    topBanners: data?.results?.filter(res=>res.type !=="outlet")
   
    .filter(item=>item.modules?.[0].widgetCode ==="uae_homepage_banners_2")
    .flatMap(item => item.modules?.[0].banners || []),

    upStileBanners: data?.results?.filter(res=>res.type !== "outlet")
      .filter(item=>item?.modules?.[0]?.widgetCode==="uae_homepage_usptile")
       .flatMap(item=>item?.modules?.[0].banners || []),

    cuisineBanners:data?.results?.filter(res=>res.type !== "outlet")?.
        filter(item=>item?.modules?.[0]?.widgetCode==="uae_homepage_cuisine")?.
        flatMap(item=>item?.modules?.[0].banners || []),

    localFavoriteBanners:data?.results?.filter(res=>res.type !== "outlet")?.
        filter(item=>item?.modules?.[0]?.widgetCode==="guides_localfavorites_1")?.
        flatMap(item=>item?.modules?.[0].banners || []),

    popularRestaurantBanners:data?.results?.filter(res=>res.type !== "outlet")?.
         filter(item=>item?.modules?.[0]?.widgetCode === "uae_homepage_popularrestaurants")?.
         flatMap(item=>item?.modules?.[0].banners || []),

    midScrollBanners:data?.results?.filter(res=>res.type === "outlet")?.
         filter(item=>item?.modules?.[0]?.widgetCode === "uae_homepage_midscroll")?.
         flatMap(item=>item=>item?.modules?.[0].banners || [])
  }
},[data])
    return(
        <>

       <div >
       <div className=" flex overflow-scroll no-Scrollbar w-[950px]     ">
          {
        
             bannerSection.topBanners?.map(item=>
                   <div className="  m-2 hover:cursor-pointer hover:scale-[1.2] duration-500 py-6 mr-[8px]  ">
                           <img src={item.imageUrl}  alt={item.gapt.name} className="  mr-[200px] " onClick={()=>handleHomePageBanner(item.gapt.name,item.linkUrl)} /> 
                   </div>
             )
          }

        </div>
       </div>
   
         
  <div className=" flex mx-8 my-8 " data-direction="right">
 
      {
     
          bannerSection.upStileBanners?.map(item=>
                    <img src={item?.imageUrl} alt={item.imageUrl} className="scroller_inner w-[150px] hover:scale-[1.2] duration-500" onClick={()=>handleHomePageUsptile(item.linkUrl)} />
         )  
       
      }
  </div>  


             <div className="flex overflow-scroll no-Scrollbar w-[950px] ">
      {
    
         bannerSection.cuisineBanners?.map(item=>
                <div className="m-4    hover:cursor-pointer hover:scale-[1.2] duration-500 py-6 mr-[8px] " >
           
                       <img src={item?.imageUrl} alt={item.imageUrl} className="mr-[100px] py-3" onClick={()=>handleHomePageCuisine(item.linkUrl)} />
         
                </div>
      )
    
      }
  </div>  



      <div className="flex overflow-scroll no-Scrollbar w-[950px] ">
      {
     
         bannerSection.localFavoriteBanners?.map(item=>
          
              <div className="m-4   hover:cursor-pointer hover:scale-[1.2] duration-500 py-6 mr-[8px]  " >
         
                       <Link to={item.linkUrl}>
                              <img src={item?.imageUrl} alt={item.imageUrl} className="mr-[100px] my-3"  />
                       </Link>
           
               </div>
         )
    
      }
  </div>   

               
               <div className="flex overflow-scroll no-Scrollbar w-[950px] ">
                   {  
               
                     bannerSection.popularRestaurantBanners?.map(item=>
                              <div className="m-4   hover:cursor-pointer hover:scale-[1.2] duration-500 py-6 mr-[8px]">
                                      <Link to={item.linkUrl}>
                                           <img src={item?.imageUrl} className="mr-[150px] py-3" />
                                      </Link>
                               </div>
                                      )
                           
                   }
                    </div>
               <div className="flex mx-8 flex-wrap ">
      {
     
         bannerSection.midScrollBanners?.map(item=>
                <div className="mx-4" >
        
                   <img src={item?.imageUrl} className="w-[150px] py-4 hover:cursor-pointer" onClick={()=>handleHomePageMidScroll(item.gapt.name,item.linkUrl)} />
            
                 </div>
         )
    
      }
         </div> 
        </>
    )
 }

 export default SearchComponent
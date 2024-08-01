import { useCallback, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchData } from "../app/restaurantSearchSlice"
import { createSearchParams, Link, useNavigate } from "react-router-dom"
import { fetchHomePageCuisine } from "../app/HomePageCuisineSlice"
import BannerComponent from "./BannerComponent"
import HorizontalInfiniteScroll from "./HorizontalInfiniteScroll"



 const SearchComponent=()=>{
 const data=useSelector(state=>state.restaurantSearch.restaurantSearchObj)
    
console.log(data ,"ser")
const dispatch=useDispatch()
  const navigate=useNavigate()

useEffect(()=>{
    dispatch(fetchSearchData())
},[])

/*---------------------------- Css fun------------------------------- */


const scrollers=document.querySelectorAll(".scroller");
if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    addAnimation()
}

function addAnimation(){
    scrollers.forEach(scroller=>{
        scroller.setAttribute("data-animated",true)
         const scrollerInner=scroller.querySelector(".scroller_inner")
       /*  const scrollerContent= Array.from(scrollerInner.children);
        console.log(scrollerContent)
        scrollerContent.forEach(item=>{
            const duplicatetedItem=item.cloneNode(true)
            console.log(duplicatetedItem)
            duplicatetedItem.setAttribute("aria-hidden",true)
            scrollerInner.appendChild(duplicatetedItem)
        })  */
    })
}



/* ---------------------------------------------------------------------------------------- */
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
   console.log(url)
   console.log(name)
    if(bannerUrls.includes(name)){
      handleNavigation("/HomePageCuisine",{url})
     
   } else{
       navigate(url)  
   }
},navigate,handleNavigation)

const handleHomePageCuisine=useCallback((url)=>{
  console.log(url ,"url msg")
 // dispatch(fetchHomePageCuisine(url))
 // navigate("/homePageCuisine")
 console.log(url)
  handleNavigation("/homePageCuisine",{url})
},[handleNavigation])

const handleHomePageUsptile=useCallback((url)=>{
  console.log(url,"url mggg")
 handleNavigation("/homePageCuisine",{url})
},[handleNavigation])

const handleHomePageMidScroll=useCallback((name,url)=>{
  console.log(name)
  console.log(url)
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

    upStileBanners: data?.results?.filter(res=>res.type !== "outlet")?.
       filter(item=>item?.modules?.[0]?.widgetCode==="uae_homepage_usptile")?.
       flatMap(item=>item?.modules?.[0].banners || []),

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
       {console.log(bannerSection.topBanners)}
        {console.log( data?.results?.filter(res=>res.type !=="outlet")?.filter(item=>item.modules?.[0].widgetCode ==="uae_homepage_banners_2").map(item=>item.modules?.[0].banners))}
        <div className="flex ">
          {
        
             bannerSection.topBanners?.map(item=>
              <div className="mx-4  hover:cursor-pointer">
          
              <img src={item.imageUrl} className="w-[150px] my-4" onClick={()=>handleHomePageBanner(item.gapt.name,item.linkUrl)} /> 
            </div>
             )
          }

        </div>
     {/*    <HorizontalInfiniteScroll data={data}/> */}
         
  <div className=" flex mx-8 my-8" data-direction="right">
 {/*    <div > */}
      {
     /*   data?.results?.filter(res=>res.type !== "outlet")?.
       filter(item=>item?.modules?.[0]?.widgetCode==="uae_homepage_usptile")?.
       map(item=>item?.modules?.[0].banners?.
         map(item=>
                    <img src={item?.imageUrl} className="scroller_inner w-[150px]" onClick={()=>handleHomePageUsptile(item.linkUrl)} />
         )) */
          bannerSection.upStileBanners. map(item=>
                    <img src={item?.imageUrl} className="scroller_inner w-[150px]" onClick={()=>handleHomePageUsptile(item.linkUrl)} />
         )  
      }
  </div>  


             <div className="flex mx-8 my-8 flex-wrap">
      {
     /*   data?.results?.filter(res=>res.type !== "outlet")?.
       filter(item=>item?.modules?.[0]?.widgetCode==="uae_homepage_cuisine")?.
       map(item=>item?.modules?.[0].banners?.
         map(item=><>
         <div className="mx-4  hover:cursor-pointer" >
           
           <img src={item?.imageUrl} className="w-[100px] py-3" onClick={()=>handleHomePageCuisine(item.linkUrl)} />
         
         </div>
         </>)) */
         bannerSection.cuisineBanners.map(item=><>
         <div className="mx-4  hover:cursor-pointer" >
           
           <img src={item?.imageUrl} className="w-[100px] py-3" onClick={()=>handleHomePageCuisine(item.linkUrl)} />
         
         </div>
         </>)
    
      }
  </div>  



      <div className="flex flex-wrap mx-8">
      {
       /* data?.results?.filter(res=>res.type !== "outlet")?.
       filter(item=>item?.modules?.[0]?.widgetCode==="guides_localfavorites_1")?.
       map(item=>item?.modules?.[0].banners?.
         map(item=><>
         <div className="mx-4 " >
           {console.log(item.linkUrl,"link")}
          <Link to={item.linkUrl}>
          <img src={item?.imageUrl} className="w-[70px] my-3"  />
          </Link>
           
         </div>
         </>)) */
         bannerSection.localFavoriteBanners.ap(item=>
          
         <div className="mx-4 " >
           {console.log(item.linkUrl,"link")}
          <Link to={item.linkUrl}>
          <img src={item?.imageUrl} className="w-[70px] my-3"  />
          </Link>
           
         </div>
         )
    
      }
  </div>   

               
               <div className="flex mx-8 py-8 flex-wrap">
                   {  
                /*    data?.results?.filter(res=>res.type !== "outlet")?.
                    filter(item=>item?.modules?.[0]?.widgetCode==="uae_homepage_popularrestaurants")?.
                    map(item=>item?.modules?.[0].banners?.
                      map(item=><>
                      <div className="mx-4">
                         {console.log(item.linkUrl ,"serach  link ")} 
                      <Link to={item.linkUrl}>
                      <img src={item?.imageUrl} className="w-[100px] py-3" />
                      </Link>
                      </div>
                      </>)) */
                     bannerSection.popularRestaurantBanners.map(item=><>
                      <div className="mx-4">
                         {console.log(item.linkUrl ,"serach  link ")} 
                      <Link to={item.linkUrl}>
                      <img src={item?.imageUrl} className="w-[100px] py-3" />
                      </Link>
                      </div>
                      </>)
                 
                   }
               </div>
               <div className="flex mx-8 flex-wrap ">
      {
      /*  data?.results?.filter(res=>res.type !== "outlet")?.
       filter(item=>item?.modules?.[0]?.widgetCode ==="uae_homepage_midscroll")?.
       map(item=>item?.modules?.[0].banners?.
         map(item=><>
         <div className="mx-4" >
          {console.log(item)}
           <img src={item?.imageUrl} className="w-[150px] py-4 hover:cursor-pointer" onClick={()=>handleHomePageMidScroll(item.gapt.name,item.linkUrl)} />
             {console.log(item.gapt.name)}
         </div>
         </>)) */
         bannerSection.midScrollBanners.map(item=><>
         <div className="mx-4" >
          {console.log(item)}
           <img src={item?.imageUrl} className="w-[150px] py-4 hover:cursor-pointer" onClick={()=>handleHomePageMidScroll(item.gapt.name,item.linkUrl)} />
             {console.log(item.gapt.name)}
         </div>
         </>)
    
      }
         </div> 
        </>
    )
 }

 export default SearchComponent
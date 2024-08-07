import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet,  useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import Body from "./components/Body";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Card from "./components/Card";
import NavSearchFacets from "./components/NavSearchFacets";
import FilterRestaurant from "./components/FilterRestaurant";
import HomePageCuisine from "./components/HomePageCuisine";
import Account from "./AccountComponents/Account";
import Orders from "./AccountComponents/Orders";
import Profile from "./AccountComponents/Profile";
import PaymentCards from "./AccountComponents/PaymentCards";
import AddressBook from "./AccountComponents/AddressBook";
import NoonCredits from "./AccountComponents/NoonCredits";
import { store } from "./app/store";
import Footer from "./components/Footer";





const AppLayout = () => {
  const location=useLocation()
 const [url,setUrl]=useState(location.pathname)
  
  useEffect(()=>{
    setUrl(location.pathname)
  },[location.pathname])
 
  return (
    <div className="app">
           <Provider store={store}>
                    <CookiesProvider>
                       <div className="flex flex-col">
                                 <div className="bg-gray-50">
                                      <Header />
                                 </div>
                             
                        <div className="flex">
                             {                    !url.includes("/outlet") && !url.includes("/Account") &&(
                                     <div className="w-[400px] px-[100px] m-6 bg-gray-100">
                                            <NavSearchFacets />
                                     </div>
                              )
                             }

                                     <div>
                                            <Outlet />
                                    </div>
                                    
                        </div>
                                   <footer className="fixed bottom-0 flex mx-5 py-2 w-screen bg-rose-600">
                                             <Footer/>
                                    </footer>
                         </div>         
                    </CookiesProvider>
             </Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [    
       {  path: "/", element: <Body /> },
       {  path: "/about", element: <About /> },
       {  path: "/contact",element: <Contact />   },
       {  path: "/outlet/:outletCode", element: <Card /> },
       {  path: "/filterRestaurant", element: <FilterRestaurant /> },
       {  path: "/homePageCuisine", element: <HomePageCuisine /> },
       {
        path: "/Account",
        element: <Account />,
        children:[
          {  path:"Orders", element:<Orders />   },
          {  path:"Profile", element:<Profile/>  },
          {  path:"PaymentCards", element:<PaymentCards/>  },
          {  path:"AddressBook", element:<AddressBook/>  },
          {  path:"NoonCredits", element:<NoonCredits/>  },
           ]
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

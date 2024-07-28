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



/* const RestaurantDetails= lazy(()=> import("./components/RestaurantDetails")) */

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
                              <Header />
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

import React, { Suspense, useEffect, useRef } from "react";
import Header from "../components/Header/header";
import { Route, Routes } from "react-router-dom";
import routes from "../routes/route";
import LoaderSuspense from "./loaderSuspense";

const PageContent = () => {
  const mainContentRef = useRef(null);
  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="drawer-content flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200 " ref={mainContentRef}>
        <Suspense fallback={<LoaderSuspense />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PageContent;

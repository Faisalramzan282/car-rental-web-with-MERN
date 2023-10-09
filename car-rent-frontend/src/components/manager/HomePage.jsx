import React, { useState,useEffect } from "react";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { Outlet,useLocation } from "react-router-dom";
const HomePage = () => {
  const location = useLocation();
  const [showBodyAndFooter, setShowBodyAndFooter] = useState(true);
  useEffect(() => {
    if (location.pathname === "/home") {
      setShowBodyAndFooter(true);
    } else {
      setShowBodyAndFooter(false);
    }
  }, [location]);
  return (
    <div className="flex">
      <div className=" min-h-screen">
        <SideBar />
      </div>
      <div>
        <Outlet /> {/* for child routes here */}
      </div>
        {showBodyAndFooter && (
          <div >
            <main className="p-6 flex-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, Manager!</h2>
                <p>
                  As a manager, you have access to several key functionalities to
                  manage your car rental business:
                </p>
                <section className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p>
                    You can perform Create, Read, Update, and Delete (CRUD)
                    operations on user accounts. This includes adding new users,
                    updating their information, and deactivating accounts when
                    necessary.
                  </p>
                </section>
                <section className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Car Management</h3>
                  <p>
                    Manage your fleet of cars efficiently. You can add new cars to
                    your inventory, update car details, and mark cars as available
                    or reserved.
                  </p>
                </section>
                <section className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Reservations</h3>
                  <p>
                    View reservations made by customers. You can see which cars
                    are reserved and the details of the reservations, including
                    the pickup and return dates.
                  </p>
                </section>
              </div>
            </main>
         
          <div className="">
          <Footer />
        </div>
        </div>
        )}
    </div>
  );
};
export default HomePage;

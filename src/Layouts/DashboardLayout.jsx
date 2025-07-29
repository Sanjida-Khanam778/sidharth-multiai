import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DashboardLayout() {
  const { id } = useParams();

  return (
    <div>
      <Nav />
      <div className="flex h-[89vh] bg-gray-50 relative">
        {/* Static Sidebar */}
        <div className="hidden lg:block lg:relative lg:z-0 h-full border">
          <Sidebar />
        </div>

        {/* Chat Area - Rendered through Outlet */}
        <div className="flex-1 flex flex-col w-10/12">
          <Outlet context={{ sessionId: id }} />
        </div>
      </div>
    </div>
  );
}

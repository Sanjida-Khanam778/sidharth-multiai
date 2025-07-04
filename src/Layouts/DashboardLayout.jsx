import React from "react";
import Dashboard from "./Dashboard";
import Nav from "../components/Nav/Nav";

export default function DashboardLayout() {
  return (
    <div>
      <Nav />
      <Dashboard />
    </div>
  );
}

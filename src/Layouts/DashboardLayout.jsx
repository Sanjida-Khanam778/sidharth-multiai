import React from "react";
import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import Nav from "../components/Nav/Nav";

export default function DashboardLayout() {
  const { id } = useParams();

  return (
    <div>
      <Nav />
      <Dashboard sessionId={id} />
    </div>
  );
}

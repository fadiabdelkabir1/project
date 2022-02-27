import React from "react";
import { useSelector } from "react-redux";


export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div>
      <h1>Welcome {user?.name} </h1>
      <img src="/images/profile.png" alt="pic" />
    </div>
  );
}

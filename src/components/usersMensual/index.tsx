import React, {useEffect, useState} from "react";
import { getUsers } from "@/redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const UserMensual: React.FC = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state: any) => state.userReducer.userList);

  const usersCreatedThisMonth = userList.filter((user: any) => {
      const userCreatedAt = new Date(user.createdAt);
      const currentDate = new Date();
      
      return (
          userCreatedAt.getMonth() === currentDate.getMonth() &&
          userCreatedAt.getFullYear() === currentDate.getFullYear()
      );
  });

  const numberOfUsers = usersCreatedThisMonth.length;

  return (
      <>
          <div className="chart-svg">
            <svg viewBox="0 0 36 36" className="circular-chart blue">
              <path className="circle-bg" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path className="circle" strokeDasharray={` 100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <path className="circle-inactive" strokeDasharray={`100`} fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
              <text x="18" y="20.35" className="percentage" fill="transparent">{`${numberOfUsers}`}</text>
            </svg>
            </div>
            
      </>
  );
};

export default UserMensual;

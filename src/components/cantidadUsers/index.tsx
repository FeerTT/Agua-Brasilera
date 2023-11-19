
import React, {useEffect, useState} from "react";
import { getUsers } from "@/redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const CantidadUsers: React.FC = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state: any) => state.userReducer.userList);
  const filteredUserList = useSelector((state: any) => state.userReducer.filteredUserList);
  useEffect(() => {
    dispatch(getUsers() as any);
  }, [dispatch]);
  console.log(userList, filteredUserList, "hola")
  const totalUsers = userList.length;
  const disabledUsers = filteredUserList.length;
  const percentageDisabled = ((disabledUsers / totalUsers) * 100).toFixed(1);
  const usuariosHabilitados = totalUsers-disabledUsers;
  return (
      <>
    <div className="chart-info-wrapper">
        <h2 id="userTotal">Usuarios Totales:</h2>
        <span id="spanTotalUsers">{totalUsers}</span>
        <h2 id="textInactiveUser">Usuarios Habilitados:</h2>
        <span id="spanTotalUsers">{disabledUsers}</span>
        <h2 id="textActiveUser">Usuarios Deshabilitados:</h2>
        <span id="spanTotalUsers">{usuariosHabilitados}</span>
    </div>
        <div className="chart-svg">
        <svg viewBox="0 0 36 36" className="circular-chart pink">
          <path
            className="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          ></path>
          <path
            className="circle"
            strokeDasharray={`${percentageDisabled}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          ></path>
          <text x="18" y="20.35" className="percentage">
            {`${percentageDisabled}%`}
          </text>
        </svg>
      </div>
    
         
      </>
  );
};

export default CantidadUsers;

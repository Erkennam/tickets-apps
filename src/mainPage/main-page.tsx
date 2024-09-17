import React, { FC } from "react";
import TicketsPage from "./ticketsPage";
import Menu from "./Menu";

const MainPage: FC = () => {
  return (
    <div className="flex h-screen">
      <Menu />
      <TicketsPage />
    </div>
  );
};

export default MainPage;

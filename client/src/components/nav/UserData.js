import React from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";

export const UserData = [
  {
    title: "History",
    path: "/user/history",
    icon: <RiIcons.RiHistoryFill />,
    cName: "nav-text",
  },
  {
    title: "Wishlist",
    path: "/user/wishlist",
    icon: <FaIcons.FaRegHeart />,
    cName: "nav-text",
  },
  {
    title: "Password",
    path: "/user/password",
    icon: <SiIcons.Si1Password />,
    cName: "nav-text",
  },
];

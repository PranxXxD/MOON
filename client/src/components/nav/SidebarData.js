import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as ImIcons from 'react-icons/im';
import * as MdIcons from 'react-icons/md';
import * as SiIcons from "react-icons/si";
import * as FiIcons from "react-icons/fi";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <MdIcons.MdDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Product',
    path: '/admin/product',
    icon: <FaIcons.FaProductHunt />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Category',
    path: '/admin/category',
    icon: <FiIcons.FiImage />,
    cName: 'nav-text'
  },
  {
    title: 'Sub Category',
    path: '/admin/sub',
    icon: <ImIcons.ImImages />,
    cName: 'nav-text'
  },
  {
    title: 'Coupon',
    path: '/admin/coupon',
    icon: <RiIcons.RiCoupon3Line />,
    cName: 'nav-text'
  },
  {
    title: 'Password',
    path: '/user/password',
    icon: <SiIcons.Si1Password  />,
    cName: 'nav-text'
  }
];

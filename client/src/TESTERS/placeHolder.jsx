import React, { useState, useEffect } from "react";

import { DesChangeForm, Team_Form_X } from "../pages/Forms";
import Profile from "../pages/Profile";
import Test from "./test";
import { AddProject, ProjectList } from "../pages/Home";
import Modal from "../components/modal";

const Component = () => {
 
  return <Modal element={<DesChangeForm/>} btn_Name={'Name'}/>;
};
export default Component;

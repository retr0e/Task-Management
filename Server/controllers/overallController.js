import { getAllStates, getAllPrivileges } from "../model/overallModel.js";

export const getStates = async (req, res) => {
  try {
    const states = await getAllStates();

    res.status(200).json({
      status: "success",
      states: states,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const getPrivileges = async (req, res) => {
  try {
    const privileges = await getAllPrivileges();

    res.status(200).json({
      status: "success",
      privi: privileges,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

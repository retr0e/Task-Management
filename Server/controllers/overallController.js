import {
  getAllStates,
  getAllPriorities,
  getAllTeams,
} from "../model/overallModel.js";

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

export const getPriorities = async (req, res) => {
  try {
    const priorities = await getAllPriorities();

    res.status(200).json({
      status: "success",
      priority: priorities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await getAllTeams();

    res.status(200).json({
      status: "success",
      teams: teams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const debug = (req, res) => {
  console.log(req.body);
};

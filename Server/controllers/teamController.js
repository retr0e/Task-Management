import { checkPeopleInTeam, checkPresence } from "./../model/teamModel.js";

export const addPeopleToTeam = async (req, res) => {
  try {
    const updatedPersonsData = await checkPresence(
      req.body["people"],
      Number(req.body["teamId"])
    );

    // console.log(updatedPersonsData);
    res.status(200).json({
      status: "success",
      people: updatedPersonsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};

export const selectTeamForPeople = async (req, res) => {
  try {
    const updatedPersonsData = await checkPeopleInTeam(
      req.body["persons"],
      Number(req.body["teamId"])
    );

    res.status(200).json({
      status: "success",
      people: updatedPersonsData,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error,
    });
  }
};

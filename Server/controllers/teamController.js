import { checkPeopleInTeam } from "./../model/teamModel.js";

export const addPeopleToTeam = (req, res) => {
  console.log(req.body);
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

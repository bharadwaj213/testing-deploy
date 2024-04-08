import { useEffect, useState } from "react";
import SAQDashboardListItem from "./SAQDashboardListItem";
import MCQDashboardListItem from "./MCQDashboardListItem";
import Select from "react-select";

function Dashboard() {
  const [numberOfResponses, setNumberOfResponses] = useState(0);
  const [summaryData, setSummaryData] = useState([]);
  const [sdOriginal, setSdOriginal] = useState([]);
  const [formQuestions, setFormQuestions] = useState([]);
  const [formResponses, setFormResponses] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/admin/getSummaryDashboardData/${localStorage.getItem("formID")}`,
        // `http://localhost:3000/getSummaryDashboardData/${localStorage.getItem("formID")}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setNumberOfResponses(json.numberOfResponses);
      setSummaryData(json.summaryData);
      setSdOriginal(json.summaryData);
      setFormQuestions(json.formQuestions);
      setFormResponses(json.formResponses);
      var tempOptions = [];
      json.formGroups.forEach((group) => {
        tempOptions.push({
          value: group.groupID,
          label: `${group.groupName} (${group.groupID})`,
        });
      });
      setOptions(tempOptions);
    };
    fetchData();
  }, []);

  const handleGroupFilter = (groupsList) => {
    if (groupsList.length === 0) setSummaryData(sdOriginal);
    else {
      const groupsListIDs = groupsList.map((i) => i.value);
      setSummaryData(filterGroups(groupsListIDs));
    }
  };

  const filterGroups = (groupsList) => {
    const summaryData = [];
    formQuestions.forEach((q) => {
      const norQuestionGroups = formResponses.filter((r) => {
        if (
          groupsList.includes(r.userGroupID) &&
          r.userResponse.filter((qr) => qr.questionID === q.questionID)
            .length === 1
        )
          return true;
        else return false;
      }).length;
      var subData;
      if (q.questionType === 1) {
        subData = {};
        for (const option of q.options) {
          subData[option.optionID] = 0;
        }
        formResponses.forEach((r) => {
          if (groupsList.includes(r.userGroupID)) {
            const temp = r.userResponse.filter(
              (qr) => qr.questionID === q.questionID
            );
            if (temp[0]) subData[temp[0].answer.optionID] += 1;
          }
        });
      } else if (q.questionType === 2) {
        subData = [];
        formResponses.forEach((r) => {
          if (groupsList.includes(r.userGroupID)) {
            const temp = r.userResponse.filter(
              (qr) => qr.questionID === q.questionID
            );
            if (temp[0]) subData.push(temp[0].answer);
          }
        });
      }
      const totalData = {
        question: q.question,
        questionType: q.questionType,
        norQuestion: norQuestionGroups,
        subData: subData,
      };
      if (q.questionType === 1) {
        totalData.options = q.options;
      }
      summaryData.push(totalData);
    });
    console.log(summaryData);
    return summaryData;
  };

  return (
    <div className="form-dashboard-tab">
      <section className="dashboard-heading-section">
        <div className="dashboard-heading-card">
          <div className="dashboard-number-of-responses-and-filter">
            <div className="dashboard-number-of-responses-text">
              {numberOfResponses} responses
            </div>
            <div className="dashboard-group-filter">
              <Select options={options} isMulti onChange={handleGroupFilter} />
            </div>
          </div>
          <div className="dashboard-summary-text">Summary Dashboard</div>
        </div>
      </section>
      <section className="dashboard-summary-section">
        <div className="dashboard-summary-div">
          {summaryData.map((sd, index) => {
            if (sd.questionType === 1)
              return <MCQDashboardListItem key={index} content={sd} />;
            else if (sd.questionType === 2)
              return <SAQDashboardListItem key={index} content={sd} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

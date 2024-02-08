// checked
import Card from "./Card";
import PageTitle from "./PageTitle";

function Departments ({ 
  departments, 
  handleDeleteDepartment, 
  handleUpdateDepartment, 
  setIsTestResultsRequested,
  isTestsResultsRequested,
  testResults,
  createExelFile,
  onChange 
}) {

  return(
    <>
      <PageTitle />
      <div className="content">
        { departments.map((department) => {
            return (
              <Card 
                title = {department.department} 
                departmentData = {department} 
                handleDeleteDepartment = {handleDeleteDepartment} 
                handleUpdateDepartment = {handleUpdateDepartment} 
                setIsTestResultsRequested = {setIsTestResultsRequested}
                isTestsResultsRequested = {isTestsResultsRequested}
                testResults = {testResults}
                createExelFile = {createExelFile}
                onChange = {onChange}
                />
            )
          })
        }
      </div>
    </>
  );
};

export default Departments;
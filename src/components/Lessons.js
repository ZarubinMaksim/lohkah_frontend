// checked
import Card from "./Card";
import { useLocation } from "react-router-dom";
import PageTitle from "./PageTitle";

function Lessons ({ 
  data, 
  handleDeleteLesson, 
  handleUpdateLesson, 
  onChange, 
  testResults,
  setIsTestResultsRequested,
  isTestsResultsRequested,
  createExelFile,
}) {
  const location = useLocation();
  const currentDepartment = location.state.departmentData;

  return(
    <>
      <PageTitle />
      <div className="content">
        {data.map((department) => {
          if (department._id === currentDepartment._id) {
            return (
              department.lessons.map((lesson) => {
                return (
                  <Card 
                    title = {lesson.lessonName} 
                    lessonData = {lesson} 
                    currentDepartment = {currentDepartment} 
                    handleDeleteLesson = {handleDeleteLesson} 
                    handleUpdateLesson = {handleUpdateLesson}
                    onChange = {onChange}
                    testResults = {testResults}
                    setIsTestResultsRequested = {setIsTestResultsRequested}
                    isTestsResultsRequested = {isTestsResultsRequested}
                    createExelFile = {createExelFile}
                  />
                )
              })
            )
          }
        })}
      </div>
    </>
  )
}

export default Lessons;
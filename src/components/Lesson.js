// checked
import { useLocation } from "react-router-dom";
import Word from "./Word";

function Lesson({ isReversed, data, handleDeleteWord, handleUpdateWord, onChange }) {
  const location = useLocation();
  const currentLesson = location.state.lessonData;
  const currentDepartment = location.state.currentDepartment;

  return (
    <div className="lesson">
      { data.map((department) => {
        if (department._id === currentDepartment._id) {
          return (
            department.lessons.map((lesson) => {
              if (lesson._id === currentLesson._id) {
                return(
                  lesson.words.length > 0 ? (
                    <Word 
                      word = {lesson.words} 
                      currentLesson = {currentLesson} 
                      currentDepartment = {currentDepartment} 
                      isReversed = {isReversed} 
                      handleDeleteWord = {handleDeleteWord} 
                      handleUpdateWord = {handleUpdateWord}
                      onChange = {onChange}
                    />) : 
                    (null) 
                  )
                }
              })
            )
          }
        }
      )}
    </div>
  );
};

export default Lesson;
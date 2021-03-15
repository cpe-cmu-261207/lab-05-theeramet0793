const CourseCard = (props) => {
  return (
    <>
      <p>This is Course card</p>
    </>
  );
};
const onRemoveTodo = () => {
  //dispatch delete action
  dispatch({
    type: "DELETE_TODO",
    payload: id,
  });
};

export default CourseCard;

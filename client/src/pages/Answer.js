import { useParams } from "react-router-dom";

const Answer = () => {
  // fetch genre collection matching name
  const params = useParams();
  console.log(params);

  return <h1>Answer</h1>;
};

export default Answer;

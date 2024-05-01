import { useParams } from "react-router-dom";

const Answer = () => {
  const params = useParams();
  console.log(params);

  return <h1>Answer</h1>;
};

export default Answer;

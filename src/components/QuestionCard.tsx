import React from "react";
import styled from "styled-components";

type Props = {
  question: string;
  answer: string[];
  callback: any;
  userAnser: any;
  questionNum: number;
  totalQuestions: number;
};

const OptionContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`
const Options = styled.button`
display: flex;
background-color: lightblue;
width: 30rem;
justify-content: center;
align-items: center;
height: 3rem;
border: 0px;

`

const QuestionCard: React.FC<Props> = ({
  question,
  answer,
  callback,
  userAnser,
  totalQuestions,
  questionNum,
}) => (
  <div>
    <p className="Number">
      Question: {questionNum}/{totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html:question}} />
    <OptionContainer>
      {answer.map((answer,index)=>(
        <Options key={index} disabled={userAnser} onClick={callback} >
        <span>{answer}</span>
        </Options>))}
    </OptionContainer>
  </div>
);
export default QuestionCard;

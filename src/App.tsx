import React,{useState} from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestion,Difficulty,QuestionState } from './API';
import styled from 'styled-components';
import {Helmet} from 'react-helmet'

type AnserState = {
  question:string;
  answer: string;
  correct_answer:string;
  correct:boolean;
}

const QuestionContainer = styled.div`
  
`
const Container = styled.div`
  display  :flex ;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #CFE8A9;
  height: 100vh;
  width: 100vw;
`
const Header = styled.h1`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`
 const UtilButton =  styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #9ED2C6;

`
 const Menu = styled.span`
  padding: 0.75rem 10rem;
  background-color: lightcoral;

`

function App() {
  const Total_Question = 10;
  const [Loading , setLoading] = useState(false);
  const [Question, setQuestion] = useState<QuestionState[]>([]);
  const [Number, setNumber] = useState(0);
  const [UserAnswers,setUserAnswers] = useState<AnserState[]>([]);
  const [Score,setScore] = useState(0);
  const [GameOver,setGameOver]= useState(true);


  const startApi = async ()=>{
    setLoading(true);
    setGameOver(false);
    const data =await fetchQuizQuestion(Total_Question,Difficulty.EASY);
    console.log(data);
    
    setQuestion(data);
    setNumber(0);
    setScore(0);
    setLoading(false);
    setUserAnswers([]);
  }
  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{

  }
  const nexQuestion = ()=>{
    if(Number<Total_Question-1){
      setNumber(Number+1);
    }
    else{
      setNumber(0)
    }
  }
  return (
    <Container>
      <Helmet>
      <style>{'body { margin: 0px; }'}</style>
      </Helmet>
      <QuestionContainer>
      <Header> React Quiz</Header>
      {GameOver&&<UtilButton className='start' onClick={startApi}>
        Start
      </UtilButton> }
      
      {!GameOver&&<p className='score'><Menu style={{borderRight:"1px solid black"}}>Score :</Menu><Menu>{Score}</Menu></p>}
      {Loading&&<p>Loading Questions ... </p>}
      {!GameOver&&!Loading&& (<QuestionCard  
      questionNum={Number+1}
      totalQuestions={Total_Question}
      question={Question[Number].question}
      answer = {Question[Number].answer}
      userAnser = {UserAnswers ? UserAnswers[Number]:undefined}
      callback={checkAnswer}
      />)}
      {!GameOver&&<UtilButton className='Next' onClick={nexQuestion} >Next</UtilButton>}
      
      </QuestionContainer>
    </Container>
  );
}

export default App;

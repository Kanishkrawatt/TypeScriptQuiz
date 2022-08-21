import { shuffleArray } from "./utils";
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type Question = {
  category: string;
  type: string;
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
};
export type QuestionState = Question & { answer: string[] };

export const fetchQuizQuestion = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple `;
  const data = await (await fetch(endpoint)).json();
  console.log(data);
  
  return data.results.map((question: Question) => ({
    ...question,
    answer: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

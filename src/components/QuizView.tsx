import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "조선시대 세종대왕이 창제한 문자는?",
    options: ["한자", "훈민정음", "이두", "향찰"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "임진왜란이 일어난 연도는?",
    options: ["1492년", "1592년", "1692년", "1792년"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "고려시대 팔만대장경을 보관하고 있는 사찰은?",
    options: ["불국사", "해인사", "통도사", "범어사"],
    correctAnswer: 1,
  },
];

interface QuizViewProps {
  onComplete?: () => void;
}

export function QuizView({ onComplete }: QuizViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(mockQuestions.length).fill(false)
  );

  const question = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  const handleAnswerClick = (index: number) => {
    if (answeredQuestions[currentQuestion]) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(mockQuestions.length).fill(false));
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  if (showResult) {
    return (
      <div className="space-y-6">
        <Card className="p-8">
          <div className="text-center">
            <h2 className="mb-4">퀴즈 완료!</h2>
            <div className="my-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary text-primary-foreground mb-4">
                <span className="text-4xl">
                  {score}/{mockQuestions.length}
                </span>
              </div>
              <p className="text-muted-foreground">
                정답률: {Math.round((score / mockQuestions.length) * 100)}%
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleRestart} size="lg" variant="outline">
                다시 풀기
              </Button>
              <Button onClick={handleComplete} size="lg">
                완료
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground">
            문제 {currentQuestion + 1} / {mockQuestions.length}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      <Card className="p-6">
        <h3 className="mb-6">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isAnswered = answeredQuestions[currentQuestion];
            const isCorrect = index === question.correctAnswer;

            let buttonClass = "w-full justify-start text-left h-auto py-4 px-4";
            let variant: "outline" | "default" | "secondary" = "outline";

            if (isAnswered) {
              if (isCorrect) {
                buttonClass += " border-green-500 bg-green-50 dark:bg-green-950";
                variant = "outline";
              } else if (isSelected && !isCorrect) {
                buttonClass += " border-red-500 bg-red-50 dark:bg-red-950";
                variant = "outline";
              }
            } else if (isSelected) {
              variant = "default";
            }

            return (
              <Button
                key={index}
                variant={variant}
                className={buttonClass}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          {!answeredQuestions[currentQuestion] ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              정답 확인
            </Button>
          ) : (
            <Button onClick={handleNext} className="flex-1">
              {currentQuestion < mockQuestions.length - 1 ? "다음 문제" : "결과 보기"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

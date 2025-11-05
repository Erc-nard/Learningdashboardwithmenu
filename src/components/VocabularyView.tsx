import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VocabCard {
  id: number;
  term: string;
  definition: string;
  example?: string;
}

const mockVocabulary: VocabCard[] = [
  {
    id: 1,
    term: "훈민정음",
    definition: "세종대왕이 1443년에 창제한 한글의 원래 이름",
    example: "백성을 가르치는 바른 소리라는 뜻입니다.",
  },
  {
    id: 2,
    term: "과거제",
    definition: "관리를 선발하기 위한 시험 제도",
    example: "고려와 조선시대에 시행되었습니다.",
  },
  {
    id: 3,
    term: "의병",
    definition: "나라가 위기에 처했을 때 자발적으로 일어난 의로운 군대",
    example: "임진왜란 때 활약했습니다.",
  },
  {
    id: 4,
    term: "한산도 대첩",
    definition: "1592년 이순신 장군이 한산도 앞바다에서 왜군을 크게 무찌른 해전",
    example: "학익진 전술을 사용했습니다.",
  },
  {
    id: 5,
    term: "경국대전",
    definition: "조선시대 법전으로 성종 때 완성",
    example: "조선의 기본 법전입니다.",
  },
];

export function VocabularyView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = mockVocabulary[currentIndex];

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mockVocabulary.length - 1));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < mockVocabulary.length - 1 ? prev + 1 : 0));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-secondary">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {currentIndex + 1} / {mockVocabulary.length} 단어
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            처음부터
          </Button>
        </div>
      </Card>

      <div className="relative" style={{ perspective: "1000px" }}>
        <motion.div
          className="cursor-pointer"
          onClick={handleFlip}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card
            className="p-8 min-h-[300px] flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full">
                      용어
                    </span>
                  </div>
                  <h2 className="mb-4">{currentCard.term}</h2>
                  <p className="text-muted-foreground">
                    카드를 클릭하여 뜻을 확인하세요
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      뜻
                    </span>
                  </div>
                  <p className="mb-4">{currentCard.definition}</p>
                  {currentCard.example && (
                    <div className="mt-6 p-4 bg-secondary rounded-lg">
                      <p className="text-muted-foreground">{currentCard.example}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          이전
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleNext}
        >
          다음
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <p className="text-center text-muted-foreground">
          💡 화살표 버튼으로 단어를 넘기고, 카드를 클릭하여 뜻을 확인하세요
        </p>
      </Card>
    </div>
  );
}

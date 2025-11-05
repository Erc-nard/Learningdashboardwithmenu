import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Subject } from "./MainScreen";
import { QuizView } from "./QuizView";
import { NotesView } from "./NotesView";
import { VocabularyView } from "./VocabularyView";

interface SubjectDetailProps {
  subject: Subject;
  onBack: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  onReset: () => void;
}

export function SubjectDetail({ subject, onBack, activeView, onViewChange, onReset }: SubjectDetailProps) {
  const isViewActive = activeView === 'quiz' || activeView === 'notes' || activeView === 'vocabulary';

  const handleBack = () => {
    onReset();
    onBack();
  };

  const handleQuizComplete = () => {
    onViewChange('quiz-start');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2>{subject.name}</h2>
          <p className="text-muted-foreground">진도율: {subject.progress}%</p>
        </div>
      </div>

      <Tabs 
        value={activeView.startsWith('quiz') || activeView.startsWith('notes') || activeView.startsWith('vocabulary') 
          ? activeView.split('-')[0] 
          : 'quiz'} 
        className="flex-1 flex flex-col overflow-hidden"
      >
        {!isViewActive && (
          <TabsList className="mx-4 mt-4 grid grid-cols-3 flex-shrink-0">
            <TabsTrigger value="quiz" onClick={() => onViewChange('quiz-start')}>
              퀴즈
            </TabsTrigger>
            <TabsTrigger value="notes" onClick={() => onViewChange('notes-start')}>
              노트정리
            </TabsTrigger>
            <TabsTrigger value="vocabulary" onClick={() => onViewChange('vocabulary-start')}>
              단어장
            </TabsTrigger>
          </TabsList>
        )}

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="quiz" className={`p-4 m-0 ${isViewActive ? 'h-full' : ''}`}>
            {activeView !== 'quiz' ? (
              <Card className="p-6">
                <div className="text-center">
                  <h3 className="mb-4">퀴즈</h3>
                  <p className="text-muted-foreground mb-4">
                    AI가 생성한 퀴즈로 학습 내용을 복습하세요
                  </p>
                  <Button onClick={() => onViewChange('quiz')}>퀴즈 시작하기</Button>
                </div>
              </Card>
            ) : (
              <QuizView onComplete={handleQuizComplete} />
            )}
          </TabsContent>

          <TabsContent value="notes" className={`p-4 m-0 ${isViewActive ? 'h-full' : ''}`}>
            {activeView !== 'notes' ? (
              <Card className="p-6">
                <div className="text-center">
                  <h3 className="mb-4">노트정리</h3>
                  <p className="text-muted-foreground mb-4">
                    핵심 내용을 정리한 노트를 확인하세요
                  </p>
                  <Button onClick={() => onViewChange('notes')}>노트 보기</Button>
                </div>
              </Card>
            ) : (
              <NotesView />
            )}
          </TabsContent>

          <TabsContent value="vocabulary" className={`p-4 m-0 ${isViewActive ? 'h-full' : ''}`}>
            {activeView !== 'vocabulary' ? (
              <Card className="p-6">
                <div className="text-center">
                  <h3 className="mb-4">단어장</h3>
                  <p className="text-muted-foreground mb-4">
                    중요 단어와 개념을 복습하세요
                  </p>
                  <Button onClick={() => onViewChange('vocabulary')}>단어장 열기</Button>
                </div>
              </Card>
            ) : (
              <VocabularyView />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

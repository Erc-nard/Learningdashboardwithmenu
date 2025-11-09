import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Subject, Todo } from "./MainScreen";
import { QuizView } from "./QuizView";
import { NotesView } from "./NotesView";
import { VocabularyView } from "./VocabularyView";
import { TodoList } from "./TodoList";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";

interface SubjectDetailProps {
  subject: Subject;
  onBack: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  onReset: () => void;
}

function calculateDday(targetDate: Date | null | undefined): number | null {
  if (!targetDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function SubjectDetail({ subject, onBack, activeView, onViewChange, onReset }: SubjectDetailProps) {
  const isViewActive = activeView === 'quiz' || activeView === 'notes' || activeView === 'vocabulary';
  const [localSubject, setLocalSubject] = useState<Subject>(subject);
  const [isDdayModalOpen, setIsDdayModalOpen] = useState(false);
  const [ddayDate, setDdayDate] = useState(
    localSubject.dday ? new Date(localSubject.dday).toISOString().split('T')[0] : ''
  );

  const daysRemaining = calculateDday(localSubject.dday);

  const handleBack = () => {
    onReset();
    onBack();
  };

  const handleQuizComplete = () => {
    onViewChange('quiz-start');
  };

  const handleSaveDday = () => {
    if (ddayDate) {
      setLocalSubject({ ...localSubject, dday: new Date(ddayDate) });
      toast.success('목표일이 설정되었습니다');
    }
    setIsDdayModalOpen(false);
  };

  const handleRemoveDday = () => {
    setLocalSubject({ ...localSubject, dday: null });
    setDdayDate('');
    toast.success('목표일이 삭제되었습니다');
    setIsDdayModalOpen(false);
  };

  const handleAddTodo = (tabType: 'quiz' | 'notes' | 'vocabulary', text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };
    
    const updatedTodos = {
      ...localSubject.todos!,
      [tabType]: [...(localSubject.todos?.[tabType] || []), newTodo]
    };
    
    setLocalSubject({ ...localSubject, todos: updatedTodos });
    toast.success('할 일이 추가되었습니다');
  };

  const handleToggleTodo = (tabType: 'quiz' | 'notes' | 'vocabulary', id: string) => {
    const updatedTodos = {
      ...localSubject.todos!,
      [tabType]: localSubject.todos![tabType].map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    };
    
    setLocalSubject({ ...localSubject, todos: updatedTodos });
  };

  const handleDeleteTodo = (tabType: 'quiz' | 'notes' | 'vocabulary', id: string) => {
    const updatedTodos = {
      ...localSubject.todos!,
      [tabType]: localSubject.todos![tabType].filter(todo => todo.id !== id)
    };
    
    setLocalSubject({ ...localSubject, todos: updatedTodos });
    toast.success('할 일이 삭제되었습니다');
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
          <>
            {/* D-day 카드 */}
            <div className="mx-4 mt-4">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white border-none">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">목표일</p>
                    {localSubject.dday ? (
                      <>
                        <h3 className="text-2xl mb-1">
                          {daysRemaining !== null && (
                            daysRemaining > 0 ? `D-${daysRemaining}` : 
                            daysRemaining === 0 ? 'D-Day' : 
                            `D+${Math.abs(daysRemaining)}`
                          )}
                        </h3>
                        <p className="text-sm opacity-80">
                          {new Date(localSubject.dday).toLocaleDateString('ko-KR')}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm">설정되지 않음</p>
                    )}
                  </div>
                  <Dialog open={isDdayModalOpen} onOpenChange={setIsDdayModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" size="sm">
                        {localSubject.dday ? '변경' : '설정'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>목표일 설정</DialogTitle>
                        <DialogDescription>학습 목표 날짜를 설정하세요</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="dday-date">목표 날짜</Label>
                          <Input
                            id="dday-date"
                            type="date"
                            value={ddayDate}
                            onChange={(e) => setDdayDate(e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div className="flex gap-2">
                          {localSubject.dday && (
                            <Button variant="destructive" onClick={handleRemoveDday} className="flex-1">
                              삭제
                            </Button>
                          )}
                          <Button onClick={handleSaveDday} className="flex-1">
                            저장
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </div>

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
          </>
        )}

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="quiz" className={`p-4 m-0 ${isViewActive ? 'h-full' : ''}`}>
            {activeView !== 'quiz' ? (
              <>
                <TodoList
                  title="퀴즈"
                  todos={localSubject.todos?.quiz || []}
                  onAddTodo={(text) => handleAddTodo('quiz', text)}
                  onToggleTodo={(id) => handleToggleTodo('quiz', id)}
                  onDeleteTodo={(id) => handleDeleteTodo('quiz', id)}
                />
                <Card className="p-6">
                  <div className="text-center">
                    <h3 className="mb-4">퀴즈</h3>
                    <p className="text-muted-foreground mb-4">
                      AI가 생성한 퀴즈로 학습 내용을 복습하세요
                    </p>
                    <Button onClick={() => onViewChange('quiz')}>퀴즈 시작하기</Button>
                  </div>
                </Card>
              </>
            ) : (
              <QuizView onComplete={handleQuizComplete} />
            )}
          </TabsContent>

          <TabsContent value="notes" className={`p-4 m-0 ${isViewActive ? 'h-full' : ''}`}>
            {activeView !== 'notes' ? (
              <>
                <TodoList
                  title="노트정리"
                  todos={localSubject.todos?.notes || []}
                  onAddTodo={(text) => handleAddTodo('notes', text)}
                  onToggleTodo={(id) => handleToggleTodo('notes', id)}
                  onDeleteTodo={(id) => handleDeleteTodo('notes', id)}
                />
                <Card className="p-6">
                  <div className="text-center">
                    <h3 className="mb-4">노트정리</h3>
                    <p className="text-muted-foreground mb-4">
                      핵심 내용을 정리한 노트를 확인하세요
                    </p>
                    <Button onClick={() => onViewChange('notes')}>노트 보기</Button>
                  </div>
                </Card>
              </>
            ) : (
              <NotesView />
            )}
          </TabsContent>

          <TabsContent value="vocabulary" className={`p-4 m-0 ${isViewActive ? 'h-full' : ''}`}>
            {activeView !== 'vocabulary' ? (
              <>
                <TodoList
                  title="단어장"
                  todos={localSubject.todos?.vocabulary || []}
                  onAddTodo={(text) => handleAddTodo('vocabulary', text)}
                  onToggleTodo={(id) => handleToggleTodo('vocabulary', id)}
                  onDeleteTodo={(id) => handleDeleteTodo('vocabulary', id)}
                />
                <Card className="p-6">
                  <div className="text-center">
                    <h3 className="mb-4">단어장</h3>
                    <p className="text-muted-foreground mb-4">
                      중요 단어와 개념을 복습하세요
                    </p>
                    <Button onClick={() => onViewChange('vocabulary')}>단어장 열기</Button>
                  </div>
                </Card>
              </>
            ) : (
              <VocabularyView />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
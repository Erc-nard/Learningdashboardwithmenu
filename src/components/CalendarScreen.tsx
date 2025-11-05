import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Plan {
  id: string;
  title: string;
  date: Date;
  isAI: boolean;
}

export function CalendarScreen() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      title: "한국사 1장 복습",
      date: new Date(),
      isAI: true,
    },
  ]);
  const [newPlanTitle, setNewPlanTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPlan = () => {
    if (!newPlanTitle.trim() || !date) return;
    
    const newPlan: Plan = {
      id: Date.now().toString(),
      title: newPlanTitle,
      date: date,
      isAI: false,
    };
    
    setPlans([...plans, newPlan]);
    setNewPlanTitle("");
    setIsDialogOpen(false);
  };

  const handleAIPlan = () => {
    if (!date) return;
    
    const aiSuggestions = [
      "영어 단어 30개 암기",
      "수학 문제 풀이 복습",
      "과학 노트 정리",
      "역사 요약본 작성",
    ];
    
    const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
    
    const aiPlan: Plan = {
      id: Date.now().toString(),
      title: randomSuggestion,
      date: date,
      isAI: true,
    };
    
    setPlans([...plans, aiPlan]);
  };

  const selectedDatePlans = plans.filter(
    (plan) =>
      date && plan.date.toDateString() === date.toDateString()
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h1>학습 계획</h1>
        <p className="text-muted-foreground mt-1">나의 학습 일정을 관리하세요</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </Card>

        {date && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3>{date.toLocaleDateString('ko-KR', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</h3>
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      추가
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>새 계획 추가</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="plan-title">계획 내용</Label>
                        <Input
                          id="plan-title"
                          placeholder="학습 계획을 입력하세요"
                          value={newPlanTitle}
                          onChange={(e) => setNewPlanTitle(e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <Button onClick={handleAddPlan} className="w-full">
                        추가하기
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" onClick={handleAIPlan}>
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI 추천
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {selectedDatePlans.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  이 날짜에 계획이 없습니다
                </p>
              ) : (
                selectedDatePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-3 bg-secondary rounded-lg flex items-center justify-between"
                  >
                    <span>{plan.title}</span>
                    {plan.isAI && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        AI 추천
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

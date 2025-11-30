import { SubjectCard } from "./SubjectCard";
import { ScrollArea } from "./ui/scroll-area";
import type { HierarchicalSummary } from "../services/api";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
  dday?: Date | null;
  todos?: {
    quiz: Todo[];
    notes: Todo[];
    vocabulary: Todo[];
  };
  summary?: HierarchicalSummary | null;
}

interface MainScreenProps {
  subjects: Subject[];
  onSubjectClick: (subject: Subject) => void;
}

export function MainScreen({ subjects, onSubjectClick }: MainScreenProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h1>내 학습</h1>
        <p className="text-muted-foreground mt-1">진행 중인 과목</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {subjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>아직 학습 중인 과목이 없습니다</p>
              <p className="mt-2">➕ 버튼을 눌러 과목을 추가해보세요</p>
            </div>
          ) : (
            subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                {...subject}
                onClick={() => onSubjectClick(subject)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export type { Subject, Todo };
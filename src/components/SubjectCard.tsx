import { Progress } from "./ui/progress";
import { Card } from "./ui/card";

interface SubjectCardProps {
  id: string;
  name: string;
  progress: number;
  color: string;
  onClick: () => void;
}

export function SubjectCard({ name, progress, color, onClick }: SubjectCardProps) {
  return (
    <Card
      className="p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="flex-1">{name}</h3>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" style={{ 
        ['--progress-background' as any]: color 
      }} />
    </Card>
  );
}

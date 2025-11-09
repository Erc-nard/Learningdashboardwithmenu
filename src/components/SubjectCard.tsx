import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface SubjectCardProps {
  id: string;
  name: string;
  progress: number;
  color: string;
  dday?: Date | null;
  onClick: () => void;
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

export function SubjectCard({ name, progress, color, dday, onClick }: SubjectCardProps) {
  const daysRemaining = calculateDday(dday);

  return (
    <Card
      className="p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3>{name}</h3>
          {daysRemaining !== null && (
            <Badge 
              variant={daysRemaining <= 7 ? "destructive" : "secondary"}
              className="mt-1 text-xs"
            >
              {daysRemaining > 0 ? `D-${daysRemaining}` : daysRemaining === 0 ? 'D-Day' : `D+${Math.abs(daysRemaining)}`}
            </Badge>
          )}
        </div>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" style={{ 
        ['--progress-background' as any]: color 
      }} />
    </Card>
  );
}
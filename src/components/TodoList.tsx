import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  title: string;
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ title, todos, onAddTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAdd = () => {
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim());
      setNewTodoText("");
      setIsOpen(false);
    }
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4>{title} 할 일</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title} 할 일 추가</DialogTitle>
              <DialogDescription>새로운 할 일을 입력하세요</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="todo-text">할 일</Label>
                <Input
                  id="todo-text"
                  placeholder="할 일을 입력하세요"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">
                추가
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {todos.length === 0 ? (
        <p className="text-center text-muted-foreground py-6">할 일이 없습니다</p>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                todo.completed ? 'bg-green-50 dark:bg-green-950/20' : 'bg-secondary'
              }`}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggleTodo(todo.id)}
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                {todo.text}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDeleteTodo(todo.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

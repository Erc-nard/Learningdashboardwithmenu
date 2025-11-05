import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { User, Mail, Lock, Bell, Moon } from "lucide-react";
import { Switch } from "./ui/switch";

export function SettingsScreen() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h1>설정</h1>
        <p className="text-muted-foreground mt-1">계정 및 앱 설정</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <Card className="p-6">
          <h3 className="mb-4">계정 정보</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                이름
              </Label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                defaultValue="홍길동"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                이메일
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                defaultValue="user@example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                비밀번호
              </Label>
              <Button variant="outline" className="mt-2 w-full">
                비밀번호 변경
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">앱 설정</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <div>
                  <Label>알림 설정</Label>
                  <p className="text-muted-foreground">학습 알림 받기</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-4 w-4" />
                <div>
                  <Label>다크 모드</Label>
                  <p className="text-muted-foreground">어두운 테마 사용</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">학습 목표</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="daily-goal">일일 학습 목표 (분)</Label>
              <Input
                id="daily-goal"
                type="number"
                placeholder="60"
                defaultValue="60"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button className="flex-1">저장</Button>
          <Button variant="outline" className="flex-1">
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}

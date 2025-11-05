import { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";

interface AddSubjectProps {
  onSave: (data: { name: string; description: string; file: File | null }) => void;
}

export function AddSubject({ onSave }: AddSubjectProps) {
  const [file, setFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setShowForm(true);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      onSave({ name, description, file });
      setFile(null);
      setShowForm(false);
      setName("");
      setDescription("");
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h1>과목 추가</h1>
        <p className="text-muted-foreground mt-1">PPT 또는 PDF 파일을 업로드하세요</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {!showForm ? (
          <Card className="p-8">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer py-12 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors"
            >
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="mb-2">파일을 선택하거나 드래그하세요</p>
              <p className="text-muted-foreground">PPT, PDF 파일 지원</p>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </Card>
        ) : (
          <div className="space-y-4">
            {file && (
              <Card className="p-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p>{file.name}</p>
                  <p className="text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject-name">과목명 *</Label>
                  <Input
                    id="subject-name"
                    placeholder="예: 한국사, 영어 문법 등"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject-description">과목 설명</Label>
                  <Textarea
                    id="subject-description"
                    placeholder="과목에 대한 간단한 설명을 입력하세요 (선택사항)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowForm(false);
                      setFile(null);
                      setName("");
                      setDescription("");
                    }}
                    disabled={isProcessing}
                  >
                    취소
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSave}
                    disabled={!name.trim() || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        AI 분석 중...
                      </>
                    ) : (
                      "저장"
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {isProcessing && (
              <Card className="p-4 bg-secondary">
                <p className="text-center text-muted-foreground">
                  AI가 파일을 분석하여 퀴즈를 생성하고 있습니다...
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

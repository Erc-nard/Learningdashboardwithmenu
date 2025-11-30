import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { BookOpen, Lightbulb, Star, Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import type { Subject } from "./MainScreen";
import { downloadSummaryPdf } from "../services/api";
import { toast } from "sonner@2.0.3";

interface NotesViewProps {
  subject?: Subject;
}

export function NotesView({ subject }: NotesViewProps) {
  const hasSummary = subject?.summary;

  const handleDownloadPdf = async () => {
    if (!subject?.summary) return;

    try {
      await downloadSummaryPdf(
        subject.summary.document_id,
        `${subject.name}_요약.pdf`
      );
      toast.success('요약 PDF 다운로드가 시작되었습니다.');
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      toast.error('PDF 다운로드에 실패했습니다.');
    }
  };

  // AI 요약이 있는 경우
  if (hasSummary) {
    const summary = subject.summary!;
    
    return (
      <div className="space-y-4">
        <Card className="p-4 bg-secondary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="text-muted-foreground">
                AI가 PDF를 분석하여 공책 스타일로 정리했습니다
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPdf}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              PDF 다운로드
            </Button>
          </div>
        </Card>

        {/* 공책 스타일 전체 요약 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3>📘 공책 스타일 요약</h3>
          </div>
          <div className="whitespace-pre-wrap text-muted-foreground">
            {summary.note_style_summary}
          </div>
        </Card>

        <Separator />

        {/* 페이지별 요약 */}
        <div className="space-y-3">
          <h3 className="px-2">📄 페이지별 요약</h3>
          {summary.pages.map((page) => (
            <Card key={page.page} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground flex-shrink-0">
                  {page.page}
                </div>
                <div className="flex-1">
                  <h4 className="mb-2">페이지 {page.page}</h4>
                  <p className="text-muted-foreground">{page.summary}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-2">학습 팁</h4>
              <p className="text-muted-foreground">
                공책 스타일 요약으로 전체 흐름을 파악한 후, 페이지별 요약으로 세부 내용을 복습하면 더 효과적입니다.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // AI 요약이 없는 경우 - 기존 목업 데이터 표시
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-secondary">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <p className="text-muted-foreground">
            AI가 학습 자료를 분석하여 핵심 내용을 정리했습니다
          </p>
        </div>
      </Card>

      {mockNotes.map((note, index) => (
        <Card key={note.id} className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="mb-2">{note.title}</h3>
              <p className="text-muted-foreground">{note.content}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-yellow-500" />
              <h4>핵심 포인트</h4>
            </div>
            <ul className="space-y-2">
              {note.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}

      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="mb-2">학습 팁</h4>
            <p className="text-muted-foreground">
              각 주제의 핵심 포인트를 중심으로 복습하면 더 효과적으로 학습할 수 있습니다.
              연대기를 정리하면서 역사의 흐름을 이해해보세요.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

const mockNotes = [
  {
    id: 1,
    title: "조선의 건국",
    content: "1392년 이성계가 위화도 회군을 통해 고려를 무너뜨리고 조선을 건국했습니다.",
    keyPoints: [
      "위화도 회군 (1388년)",
      "태조 이성계 즉위 (1392년)",
      "한양 천도 (1394년)",
    ],
  },
  {
    id: 2,
    title: "세종대왕의 업적",
    content: "조선 4대 왕인 세종대왕은 훈민정음을 창제하고 과학기술을 발전시켰습니다.",
    keyPoints: [
      "훈민정음 창제 (1443년)",
      "측우기, 해시계 발명",
      "4군 6진 개척",
    ],
  },
  {
    id: 3,
    title: "임진왜란",
    content: "1592년 일본의 침략으로 시작된 7년간의 전쟁입니다.",
    keyPoints: [
      "이순신 장군의 활약",
      "한산도 대첩, 명량해전",
      "의병의 활동",
    ],
  },
];
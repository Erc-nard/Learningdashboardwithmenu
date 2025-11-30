import { useState } from "react";
import { BottomNav, Tab } from "./components/BottomNav";
import { MainScreen, Subject } from "./components/MainScreen";
import { SubjectDetail } from "./components/SubjectDetail";
import { AddSubject } from "./components/AddSubject";
import { CalendarScreen } from "./components/CalendarScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { toast } from "sonner@2.0.3"
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('main');
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      name: "한국사",
      progress: 65,
      color: "#3b82f6",
      dday: new Date(new Date().setDate(new Date().getDate() + 30)),
      todos: {
        quiz: [
          { id: '1', text: '1~3장 퀴즈 풀기', completed: false }
        ],
        notes: [
          { id: '2', text: '조선시대 정리', completed: true }
        ],
        vocabulary: [
          { id: '3', text: '핵심 용어 20개 암기', completed: false }
        ]
      }
    },
    {
      id: "2",
      name: "영어 문법",
      progress: 42,
      color: "#10b981",
      dday: null,
      todos: {
        quiz: [],
        notes: [],
        vocabulary: []
      }
    },
    {
      id: "3",
      name: "수학",
      progress: 78,
      color: "#f59e0b",
      dday: new Date(new Date().setDate(new Date().getDate() + 15)),
      todos: {
        quiz: [],
        notes: [],
        vocabulary: []
      }
    },
  ]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjectViewStates, setSubjectViewStates] = useState<Record<string, string>>({});

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleBackFromDetail = () => {
    setSelectedSubject(null);
  };

  const handleResetSubjectView = () => {
    if (selectedSubject) {
      const newStates = { ...subjectViewStates };
      delete newStates[selectedSubject.id];
      setSubjectViewStates(newStates);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    // 탭 변경 시에도 과목 상세 화면 유지 (상태는 그대로)
    if (tab !== 'main') {
      setSelectedSubject(null);
    }
  };

  const handleViewChange = (view: string) => {
    if (selectedSubject) {
      setSubjectViewStates({
        ...subjectViewStates,
        [selectedSubject.id]: view,
      });
    }
  };

  const handleSaveSubject = (data: { name: string; description: string; file: File | null; summary: any }) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: data.name,
      progress: 0,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      dday: null,
      todos: {
        quiz: [],
        notes: [],
        vocabulary: []
      },
      summary: data.summary || null
    };
    
    setSubjects([...subjects, newSubject]);
    
    if (data.summary) {
      toast.success(`"${data.name}" 과목이 추가되었습니다! AI가 노트 정리를 완료했습니다.`);
    } else {
      toast.success(`"${data.name}" 과목이 추가되었습니다!`);
    }
    
    setActiveTab('main');
  };

  const renderContent = () => {
    if (selectedSubject) {
      return (
        <SubjectDetail 
          subject={selectedSubject} 
          onBack={handleBackFromDetail}
          activeView={subjectViewStates[selectedSubject.id] || 'quiz-start'}
          onViewChange={handleViewChange}
          onReset={handleResetSubjectView}
        />
      );
    }

    switch (activeTab) {
      case 'main':
        return <MainScreen subjects={subjects} onSubjectClick={handleSubjectClick} />;
      case 'add':
        return <AddSubject onSave={handleSaveSubject} />;
      case 'calendar':
        return <CalendarScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <MainScreen subjects={subjects} onSubjectClick={handleSubjectClick} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 overflow-hidden pb-16">
        {renderContent()}
      </div>
      
      <BottomNav activeTab={selectedSubject ? 'main' : activeTab} onTabChange={handleTabChange} />
      <Toaster />
    </div>
  );
}
import { motion } from "motion/react";

interface EncouragementBubbleProps {
  message: string;
  onClose: () => void;
}

export function EncouragementBubble({ message, onClose }: EncouragementBubbleProps) {
  const encouragements = [
    "화이팅! 할 수 있어요! 💪",
    "오늘도 열심히 공부하는 당신, 최고예요! ✨",
    "꾸준함이 실력이 됩니다! 🌟",
    "한 걸음 한 걸음 발전하고 있어요! 🚀",
    "대단해요! 계속 해봐요! 🎯",
  ];

  const randomMessage = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-end justify-center pb-24 pointer-events-none"
      onClick={onClose}
    >
      <div
        className="bg-primary text-primary-foreground px-6 py-4 rounded-2xl shadow-lg max-w-xs mx-4 pointer-events-auto cursor-pointer"
        style={{
          borderBottomLeftRadius: '4px',
        }}
      >
        <p className="text-center">{randomMessage}</p>
      </div>
    </motion.div>
  );
}

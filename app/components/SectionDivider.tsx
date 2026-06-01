export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative h-16 overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
        <path
          d="M0,64 L0,32 Q360,0 720,32 Q1080,64 1440,32 L1440,64 Z"
          fill="#070d07"
        />
      </svg>
    </div>
  );
}

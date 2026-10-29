export function LessonVideo({ id, title }: { id: string; title: string }) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-[1.6rem] border border-border bg-[#1c140e] shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          className="absolute inset-0 h-full w-full max-w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

import cn from "@/ui/class-names";
import { Skeleton } from "@/utils/skeleton";

interface SelectLoaderProps {
  className?: string;
}

export default function QuillLoader({ className }: SelectLoaderProps) {
  return (
    <div className={cn(className)}>
      <Skeleton className="mb-1.5 h-4 w-28 rounded" />
      <Skeleton className="h-full w-full rounded" />
    </div>
  );
}

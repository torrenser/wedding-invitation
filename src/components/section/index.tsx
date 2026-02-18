import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WeddingSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export function WeddingSection({
  className,
  title,
  subtitle,
  children,
}: WeddingSectionProps) {
  return (
    <section className={cn("w-full py-12 px-6", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
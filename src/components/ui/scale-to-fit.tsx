import { useEffect, useRef, useState } from "react";

export function ScaleToFit({ children }: { children: React.ReactNode }) {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [height, setHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return;

        const measure = () => {
            const outerWidth = outer.offsetWidth;
            const innerWidth = inner.scrollWidth;
            const innerHeight = inner.scrollHeight;
            if (innerWidth === 0) return;
            const nextScale = Math.min(1, outerWidth / innerWidth);
            setScale(nextScale);
            setHeight(innerHeight * nextScale);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(outer);
        ro.observe(inner);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [children]);

    return (
        <div ref={outerRef} className="w-full flex justify-center" style={{ height }}>
            <div
                ref={innerRef}
                style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
                className="inline-flex"
            >
                {children}
            </div>
        </div>
    );
}
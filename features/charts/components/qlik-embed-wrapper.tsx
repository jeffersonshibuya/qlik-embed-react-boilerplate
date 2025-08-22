/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState, type ReactElement } from "react";
import { type QlikEmbedRefApi } from "@qlik/embed-react";
import { Spinner } from "@/components/spinner";

interface QlikWrapperProps {
  children: ReactElement<{ ref?: any }>; // user passes a QlikEmbed component
}

export function QlikWrapper({ children }: QlikWrapperProps) {
  const chartRef = useRef<QlikEmbedRefApi<any>>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      if (chartRef.current) {
        setLoading(false); // chart / object loaded
        observer.disconnect();
      }
    });

    observer.observe(containerRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Clone the child and inject the ref
  const childWithRef = children
    ? React.cloneElement(children, { ref: chartRef })
    : null;

  return (
    <div ref={containerRef} className={`relative h-full w-full`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <Spinner size={"large"} borderSize={"medium"} borderColor={"green"} />
        </div>
      )}
      {childWithRef}
    </div>
  );
}

import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} ${className}`}>
      <span
        className="apple-eyebrow"
        style={center ? { justifyContent: "center" } : undefined}
      >
        {eyebrow}
      </span>
      <h2 className="apple-heading-compact mt-4">{title}</h2>
      {lead && (
        <p
          className="apple-subtitle text-sm leading-relaxed mt-4"
          style={center ? { marginLeft: "auto", marginRight: "auto" } : undefined}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
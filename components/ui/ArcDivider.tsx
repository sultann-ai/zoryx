interface ArcDividerProps {
  /** Background of the section below the curve. */
  to?: "cream" | "white";
}

/** Signature curve where the green hero meets the section below. Use once per page. */
export function ArcDivider({ to = "cream" }: ArcDividerProps) {
  return (
    <div aria-hidden="true" className={to === "white" ? "bg-white" : "bg-cream"}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full fill-green md:h-[120px]"
      >
        <path d="M0 0H1440Q720 240 0 0Z" />
      </svg>
    </div>
  );
}

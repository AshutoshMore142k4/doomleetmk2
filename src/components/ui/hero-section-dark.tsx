import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}: {
  angle?: number
  cellSize?: number
  opacity?: number
  lightLineColor?: string
  darkLineColor?: string
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]"
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]",
            "[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]",
          )}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent to-90%" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      secondaryCtaText,
      secondaryCtaHref,
      bottomImage,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative overflow-hidden", className)} ref={ref} {...props}>
        <RetroGrid
          angle={gridOptions?.angle ?? 65}
          cellSize={gridOptions?.cellSize ?? 60}
          opacity={gridOptions?.opacity ?? 0.5}
          lightLineColor={gridOptions?.lightLineColor ?? "#4a4a4a"}
          darkLineColor={gridOptions?.darkLineColor ?? "#2a2a2a"}
        />

        <div className="relative z-10">
          <div className="container px-4 py-20 md:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                <span>{title}</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>

              <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {subtitle.regular}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {subtitle.gradient}
                </span>
              </h1>

              <p className="mb-10 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:brightness-110"
                >
                  {ctaText}
                  <ChevronRight className="h-4 w-4" />
                </a>
                {secondaryCtaText && secondaryCtaHref && (
                  <a
                    href={secondaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-card/60"
                  >
                    {secondaryCtaText}
                  </a>
                )}
              </div>
            </div>

            {bottomImage && (
              <div className="relative mx-auto mt-16 max-w-5xl">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
                <img
                  src={bottomImage.dark}
                  alt="App preview"
                  className="relative rounded-2xl border border-border/40 shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection, RetroGrid }
export type { HeroSectionProps }

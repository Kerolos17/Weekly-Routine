import { useState, useEffect } from "react";

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [breakpoint, setBreakpoint] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        height: window.innerHeight,
      });

      // Tailwind breakpoints
      if (width < 640) {
        setBreakpoint("xs");
      } else if (width < 768) {
        setBreakpoint("sm");
      } else if (width < 1024) {
        setBreakpoint("md");
      } else if (width < 1280) {
        setBreakpoint("lg");
      } else {
        setBreakpoint("xl");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial values

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...screenSize,
    breakpoint,
    isMobile: breakpoint === "xs" || breakpoint === "sm",
    isTablet: breakpoint === "md",
    isDesktop: breakpoint === "lg" || breakpoint === "xl",
    isSmallScreen: breakpoint === "xs",
  };
};

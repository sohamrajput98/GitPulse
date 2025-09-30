import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * A reusable, high-quality tooltip component for adding context to UI elements.
 * @param {object} props
 * @param {React.ReactNode} props.children - The element to wrap with a tooltip.
 * @param {string} props.text - The text to display in the tooltip.
 */
const HoverTooltip = ({ children, text }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HoverTooltip;
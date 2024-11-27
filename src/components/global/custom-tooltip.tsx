import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';

type CustomTooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

const CustomTooltip = ({ children, content }: CustomTooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipTrigger>{children}</TooltipTrigger>
      <Tooltip>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;

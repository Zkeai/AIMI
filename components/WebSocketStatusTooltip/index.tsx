import { Radio } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WebSocketStatusTooltipProps {
  isConnected: boolean;
}

const WebSocketStatusTooltip = ({
  isConnected,
}: WebSocketStatusTooltipProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        {isConnected ? (
          <Radio className="w-4 h-4 text-green-500" />
        ) : (
          <Radio className="w-4 h-4 text-red-500" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{isConnected ? "服务正常" : "服务异常"}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default WebSocketStatusTooltip;

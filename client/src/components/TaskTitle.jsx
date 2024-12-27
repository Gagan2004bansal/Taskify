import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function TaskTitle({ label, className, variant }) {
  return (
    <div className="w-full h-12 px-4 rounded-lg bg-white border shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={clsx("w-3 h-3 rounded-full", className)} />
        <p className="text-sm font-medium text-gray-700 capitalize">{label}</p>
        <span className="text-sm text-gray-500">0</span>
      </div>

      <Button 
        variant={variant}
        size="icon" 
        className="h-8 w-8 hidden md:flex hover:bg-gray-100"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
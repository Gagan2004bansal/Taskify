import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayoutGrid, List, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TASK_TYPES = {
  todo: {
    label: "To Do",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    variant: "default"
  },
  "in progress": {
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    variant: "secondary"
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700 border-green-200",
    variant: "outline"
  }
};

const Tasks = () => {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState("board");

  const status = params?.status || "";
  const title = status ? `${status} Tasks` : "Tasks";

  if (loading) return (
    <div className="w-full space-y-4">
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <div className='flex items-center justify-between mb-4'>

        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <p className="text-sm text-muted-foreground">
            Manage and organize your tasks efficiently
          </p>
        </div>

        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>

      </div>

      <Tabs defaultValue="board" value={view} onValueChange={setView}>

        <TabsList>
          <TabsTrigger value="board" className="gap-2">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Board View
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <List className="mr-2 h-4 w-4" />
            List View
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-3 gap-2 md:gap-6 w-full my-4">
          {Object.entries(TASK_TYPES).map(([key, { label, color }]) => (
            <Card key={key} className="p-3 flex items-center justify-between bg-white shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${color.split(' ')[0]}`} />
                <Badge variant="outline" className={color}>
                  {label}
                </Badge>
                <span className="text-sm text-muted-foreground">0</span>
              </div>

              <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        <TabsContent value="board">
          <BoardView tasks={tasks} />
        </TabsContent>
        <TabsContent value="list">
          <Table tasks={tasks} />
        </TabsContent>

      </Tabs>

      <AddTask open={isDialogOpen} setOpen={setIsDialogOpen} />
    </div>
  );
};

export default Tasks;
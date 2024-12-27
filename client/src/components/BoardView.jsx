import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronUp,
  ChevronDown,
  ArrowUp,
  MessageSquare,
  Paperclip,
  ListTodo,
  MoreVertical,
  Clock,
  Users,
  FileText,
  CheckSquare
} from 'lucide-react';
import { Menu, Transition } from "@headlessui/react";

const BoardView = ({ tasks = [] }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openSubTaskDialog, setOpenSubTaskDialog] = useState(false);

  const PRIORITY_CONFIG = {
    high: {
      icon: ChevronUp,
      class: "text-red-500",
      badge: "bg-red-100 text-red-700 border-red-200"
    },
    medium: {
      icon: ArrowUp,
      class: "text-yellow-500",
      badge: "bg-yellow-100 text-yellow-700 border-yellow-200"
    },
    low: {
      icon: ChevronDown,
      class: "text-blue-500",
      badge: "bg-blue-100 text-blue-700 border-blue-200"
    }
  };

  const STATUS_CONFIG = {
    todo: "bg-slate-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
    blocked: "bg-red-500"
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const handleTaskOptions = (task) => {
    setSelectedTask(task);
    setOpenTaskDialog(true);
  };

  const TaskDialog = ({ task }) => {
    const menuItems = [
      {
        label: "Open Task",
        icon: <FileText className="h-4 w-4" />,
        onClick: () => console.log("Open task", task._id)
      },
      {
        label: "Edit",
        icon: <MessageSquare className="h-4 w-4" />,
        onClick: () => setOpenTaskDialog(true)
      },
      {
        label: "Add Sub-Task",
        icon: <ListTodo className="h-4 w-4" />,
        onClick: () => setOpenSubTaskDialog(true)
      },
      {
        label: "Duplicate",
        icon: <CheckSquare className="h-4 w-4" />,
        onClick: () => console.log("Duplicate task", task._id)
      }
    ];

    return (
      <Menu as="div" className="relative">
        <Menu.Button className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="h-4 w-4" />
        </Menu.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              {menuItems.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <span className="mr-2 text-gray-400">{item.icon}</span>
                      {item.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task._id} className="group hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="space-y-0 pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={PRIORITY_CONFIG[task.priority]?.badge}>
                  <div className="flex items-center gap-1.5">
                    {PRIORITY_CONFIG[task.priority]?.icon && 
                      React.createElement(PRIORITY_CONFIG[task.priority].icon, {
                        className: `h-3.5 w-3.5 ${PRIORITY_CONFIG[task.priority].class}`
                      })}
                    <span className="capitalize">{task.priority}</span>
                  </div>
                </Badge>
                <TaskDialog task={task} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${STATUS_CONFIG[task.stage]}`} />
                  <h3 className="font-semibold line-clamp-1">{task.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(task.date)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {task.activities?.length || 0}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      {task.activities?.map((activity) => (
                        <div key={activity._id} className="flex items-start gap-2 text-sm">
                          <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <span className="font-medium">{activity.by.name}</span>
                            <span className="text-muted-foreground"> {activity.activity}</span>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(activity.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Paperclip className="h-4 w-4 mr-2" />
                      {task.assets?.length || 0}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      {task.assets?.map((asset) => (
                        <div key={asset._id} className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{asset.name}</span>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      <ListTodo className="h-4 w-4 mr-2" />
                      {task.subTasks?.length || 0}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      {task.subTasks?.map((subtask) => (
                        <div key={subtask._id} className="space-y-1">
                          <h4 className="text-sm font-medium">{subtask.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(subtask.date)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              {task.subTasks?.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <h4 className="font-medium line-clamp-1">{task.subTasks[0].title}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(task.subTasks[0].date)}
                      </span>
                      <Badge variant="secondary">
                        {task.subTasks[0].tag}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8">
                      <Users className="h-4 w-4 mr-2" />
                      {task.team?.length || 0} Members
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      {task.team?.map((member) => (
                        <div key={member._id} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-blue-500 text-white">
                              {member.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{member.name}</span>
                            <span className="text-xs text-muted-foreground">{member.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Button variant="ghost" size="sm" className="h-8">
                  Add Subtask
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BoardView;
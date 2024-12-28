import React, { useState } from "react";
import { Calendar, ListTodo, Tag, Image as ImageIcon, Plus, X } from "lucide-react";
import UserList from "./UserList";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task = null }) => {
  console.log(task);
  const [formData, setFormData] = useState({
    title: task?.title || "",
    date: task?.date || new Date().toISOString().split('T')[0],
    stage: task?.stage?.toUpperCase() || LISTS[0],
    priority: task?.priority?.toUpperCase() || PRIORITY[2],
  });

  const [team, setTeam] = useState(task?.team || []);
  const [assets, setAssets] = useState(task?.assets || []);
  const [uploading, setUploading] = useState(false);
  const [previewAssets, setPreviewAssets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      // Your submit logic here
      console.log({ ...formData, team, assets });
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    setAssets(files);
    
    // Create preview URLs
    const previews = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setPreviewAssets(previews);
  };

  const removeAsset = (index) => {
    const newAssets = [...assets];
    newAssets.splice(index, 1);
    setAssets(newAssets);

    const newPreviews = [...previewAssets];
    URL.revokeObjectURL(newPreviews[index].url);
    newPreviews.splice(index, 1);
    setPreviewAssets(newPreviews);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ListTodo className="h-6 w-6" />
            {task ? "Update Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Task Title</Label>
              <Input
                placeholder="Enter task title"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1.5"
              />
            </div>

            <Card>
              <CardContent className="pt-6">
                <UserList setTeam={setTeam} team={team} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Task Status</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(stage) => setFormData(prev => ({ ...prev, stage }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(priority) => setFormData(prev => ({ ...prev, priority }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Attachments</Label>
                <Card>
                  <CardContent className="pt-6">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                      <div className="flex flex-col items-center justify-center">
                        <ImageIcon className="w-6 h-6 mb-2" />
                        <p className="text-sm">Drop files or click to upload</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleSelect}
                        accept=".jpg, .png, .jpeg"
                        multiple
                      />
                    </label>
                  </CardContent>
                </Card>
              </div>
            </div>

            {previewAssets.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <Label className="mb-3">Selected Files</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {previewAssets.map((file, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-2 py-1.5 px-3"
                      >
                        <ImageIcon className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeAsset(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Saving..." : (task ? "Update Task" : "Create Task")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
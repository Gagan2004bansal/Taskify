import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { summary } from '../assets/data';
import UserForm from '../components/users/UserForm';
import { getInitials } from '../utils';

const ROLE_COLORS = {
  Administrator: "bg-red-100 text-red-700",
  Developer: "bg-blue-100 text-blue-700",
  Designer: "bg-purple-100 text-purple-700",
  Analyst: "bg-green-100 text-green-700",
  default: "bg-gray-100 text-gray-700"
};

const TeamMembers = () => {
  const [users, setUsers] = useState(summary.users);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const handleAddEdit = (data) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user._id === selectedUser._id ? { ...user, ...data } : user
      ));
    } else {
      setUsers([...users, { ...data, _id: Date.now().toString(), isActive: true }]);
    }
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user._id !== id));
    setAlertOpen(false);
  };

  const handleStatusChange = (user) => {
    setUsers(users.map(u => 
      u._id === user._id ? { ...u, isActive: !u.isActive } : u
    ));
    setStatusDialogOpen(false);
    setSelectedUser(null);
  };

  console.log(selectedUser);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Team Members</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your team members and their roles
            </p>
          </div>
          <Button onClick={() => {
              setSelectedUser(null);
              setDialogOpen(true);
            }} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-600 text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.title}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge className={ROLE_COLORS[user.role] || ROLE_COLORS.default}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => {
                          setSelectedUser(user);
                          setStatusDialogOpen(true);
                        }} className={`rounded-full ${ user.isActive ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`}>
                        {user.isActive ? "Active" : "Disabled"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => {
                            setSelectedUser(user);
                            setDialogOpen(true);
                          }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => {
                            setSelectedUser(user);
                            setAlertOpen(true);
                          }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser ? "Update user details." : "Add a new team member."}
            </DialogDescription>
          </DialogHeader>
          <UserForm user={selectedUser} onSubmit={handleAddEdit} onCancel={() => setDialogOpen(false)}/>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(selectedUser?._id)} >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.isActive ? "Disable User" : "Enable User"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedUser?.isActive ? "disable" : "enable"} {selectedUser?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleStatusChange(selectedUser)}>
              {selectedUser?.isActive ? "Disable" : "Enable"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamMembers;
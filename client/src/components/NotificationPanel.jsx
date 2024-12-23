import { Bell, MessageCircle, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const ICONS = {
    alert: Bell,
    message: MessageCircle,
};

const sampleData = [
    {
        _id: "65c5bbf3787832cf99f28e6d",
        text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly.",
        notiType: "alert",
        isRead: [],
        createdAt: "2024-02-09T05:45:23.353Z",
    },
    {
        _id: "65c5f12ab5204a81bde866ab",
        text: "New task has been assigned to you and 2 others. The task priority is set a high priority.",
        notiType: "message",
        isRead: [],
        createdAt: "2024-02-09T09:32:26.810Z",
    },
];

export default function NotificationPanel() {
    const data = sampleData; // Replace with your actual data source

    const readHandler = () => {
        // Implement read functionality
    };

    const viewHandler = (notification) => {
        // Implement view functionality
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative ">
                    <Bell className="h-5 w-5" />
                    {data?.length > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                        >
                            {data.length}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-0" align="end">

                <div className="px-4 py-3 font-medium border-b">
                    Notifications
                </div>

                <ScrollArea className="h-[300px]">
                    {data?.map((item) => {
                        const Icon = ICONS[item.notiType];
                        return (
                            <div
                                key={item._id}
                                className="flex items-start gap-3 p-3 hover:bg-accent cursor-pointer"
                                onClick={() => viewHandler(item)}
                            >
                                <div className="bg-muted p-2 rounded">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium capitalize">
                                            {item.notiType}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </ScrollArea>

                <div className="flex border-t">
                    <Button
                        variant="ghost"
                        className="flex-1 rounded-none"
                        onClick={() => readHandler('all')}
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Mark all read
                    </Button>
                </div>

            </PopoverContent>
        </Popover>
    );
}
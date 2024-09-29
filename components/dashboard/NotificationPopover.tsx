import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, X } from "lucide-react";
import { useState } from "react";

interface NotificationPopoverProps {
    isMobile?: boolean;
}

export default function NotificationPopover({ isMobile = false }: NotificationPopoverProps) {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New prayer time update", time: "5 minutes ago" },
        { id: 2, message: "Upcoming event: Community Iftar", time: "1 hour ago" },
        { id: 3, message: "Donation goal reached!", time: "2 hours ago" },
        { id: 4, message: "New community member joined", time: "3 hours ago" },
        { id: 5, message: "Event reminder: Ramadan Iftar", time: "4 hours ago" },
        { id: 6, message: "Charity drive update", time: "5 hours ago" },
        { id: 7, message: "Prayer schedule adjustment", time: "6 hours ago" },
        { id: 8, message: "Community service opportunity", time: "7 hours ago" },
        { id: 9, message: "Mosque renovation update", time: "8 hours ago" },
        { id: 10, message: "New prayer leader announced", time: "9 hours ago" },
        { id: 11, message: "Ramadan Kareem wishes", time: "10 hours ago" },
        { id: 12, message: "Eid Mubarak greetings", time: "11 hours ago" },
        { id: 13, message: "Community event: Eid Celebration", time: "12 hours ago" },
    ]);

    const removeNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-emerald-50 hover:text-emerald-200"
                >
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <span className="absolute top-2 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-0"
                align={isMobile ? "start" : "end"}
                side={isMobile ? "bottom" : "bottom"}
            >
                <div className="flex justify-between items-center bg-emerald-800 text-emerald-50 px-4 py-1 rounded-t-md">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="ghost" className="hover:text-white" onClick={clearAllNotifications}>
                        Clear All
                    </Button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <p className="p-4 text-center text-gray-500">No new notifications</p>
                    ) : (
                        notifications.map((notification) => (
                            <div key={notification.id} className="flex items-start justify-between p-4 border-b border-emerald-100">
                                <div className="flex-1 mr-2">
                                    <p className="text-sm font-medium text-emerald-800 break-words">{notification.message}</p>
                                    <p className="text-xs text-emerald-600 whitespace-nowrap">{notification.time}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className=" hover:text-white"
                                    onClick={() => removeNotification(notification.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
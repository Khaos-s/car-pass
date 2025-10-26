import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCheck, Check, Trash2 } from 'lucide-react';

// Mock Data
const mockNotifications = [
    {
        id: '1',
        type: 'warning',
        title: 'Registration Expiring Soon',
        message: 'Your vehicle ABC 1234 registration will expire in 30 days.',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '2',
        type: 'success',
        title: 'Vehicle Approved',
        message: 'Your vehicle XYZ 5678 has been approved for parking.',
        read: false,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: '3',
        type: 'info',
        title: 'Parking Slot Reserved',
        message: 'You have successfully reserved slot A-15.',
        read: true,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    }
];

export const NotificationCenter = () => {
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getNotificationIcon = (type) => {
        const iconClass = "h-5 w-5";
        switch (type) {
            case 'success':
                return <CheckCheck className={`${iconClass} text-green-500`} />;
            case 'warning':
                return <Bell className={`${iconClass} text-yellow-500`} />;
            case 'error':
                return <Bell className={`${iconClass} text-red-500`} />;
            default:
                return <Bell className={`${iconClass} text-blue-500`} />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notifications
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="ml-2">
                                    {unreadCount} new
                                </Badge>
                            )}
                        </CardTitle>
                        <CardDescription>
                            Stay updated with your parking activities
                        </CardDescription>
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" onClick={markAllAsRead}>
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Mark all as read
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No notifications
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-lg border transition-colors ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        {getNotificationIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">
                                                    {notification.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <Badge variant="secondary" className="shrink-0">
                                                    New
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs text-gray-500">
                                                {formatDate(notification.createdAt)}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs text-blue-600 hover:underline"
                                                    >
                                                        <Check className="h-3 w-3 inline mr-1" />
                                                        Mark as read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-xs text-red-600 hover:underline"
                                                >
                                                    <Trash2 className="h-3 w-3 inline mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
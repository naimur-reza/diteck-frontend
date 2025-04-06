"use client";

import { formatDistanceToNow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TBlog } from "@/types";
import Link from "next/link";

interface BlogCardProps {
  blog: TBlog;
  onClick?: () => void;
}

export function BlogCard({ blog, onClick }: BlogCardProps) {
  const { _id, title, bio, author, thumbnail, createdAt } = blog;

  // Format the date to show how long ago the blog was created
  // Add validation to prevent "Invalid time value" error
  let formattedDate = "Recently";
  if (createdAt) {
    try {
      const date = new Date(createdAt);
      if (!isNaN(date.getTime())) {
        formattedDate = formatDistanceToNow(date, { addSuffix: true });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="relative min-h-56 w-full">
        <Image
          src={thumbnail || "/placeholder.svg?height=192&width=384"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <Link href={`/blog/${_id}`}>
          <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">{bio}</p>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author?.avatar} alt={author?.name} />
            <AvatarFallback>
              {getInitials(author?.name || "Author Name")}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-medium">{author?.name || "Author Name"}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

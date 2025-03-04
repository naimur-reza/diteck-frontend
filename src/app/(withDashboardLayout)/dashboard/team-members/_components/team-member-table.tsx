"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TTeamMember } from "@/types";
import { MoreHorizontal, Pencil, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { roles } from "./team-member-form";

interface TeamMembersTableProps {
  members: TTeamMember[];
  onEdit: (member: TTeamMember) => void;
  onDelete: (member: TTeamMember) => void;
  isFetching: boolean;
}

export function TeamMembersTable({
  isFetching,
  members,
  onEdit,
  onDelete,
}: TeamMembersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredMembers = members.filter(({ name, email, teamRole }) => {
    const query = searchQuery.toLowerCase();
    return (
      [name, email, teamRole].some((field) =>
        field?.toLowerCase().includes(query)
      ) &&
      (roleFilter === "all" || teamRole?.toLowerCase() === roleFilter)
    );
  });

  const tableHeaders = ["Name", "Role", "Status", "Joined", "Actions"];
  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "manager", label: "Manager" },
    { value: "frontEndDeveloper", label: "Frontend Developer" },
    { value: "backEndDeveloper", label: "Backend Developer" },
    { value: "designer", label: "UI/UX Designer" },
  ];

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="w-[200px] sm:w-[300px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all" onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className={header === "Actions" ? "text-right" : ""}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Loading team members...
              </TableCell>
            </TableRow>
          ) : filteredMembers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                No team members found
              </TableCell>
            </TableRow>
          ) : (
            filteredMembers.map((member) => {
              const {
                _id,
                name,
                email,
                profilePhoto,
                teamRole,
                status,
                startDate,
              } = member;
              const roleLabel = roles.find(
                (role) => role.value === teamRole
              )?.label;

              return (
                <TableRow key={_id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={profilePhoto} alt={name} />
                        <AvatarFallback>
                          {name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-sm text-muted-foreground">
                          {email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{roleLabel}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {status}
                    </span>
                  </TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {[
                          {
                            icon: Pencil,
                            label: "Edit",
                            action: () => onEdit(member),
                          },
                          {
                            icon: Trash2,
                            label: "Delete",
                            action: () => onDelete(member),
                            destructive: true,
                          },
                        ].map(({ icon: Icon, label, action, destructive }) => (
                          <DropdownMenuItem
                            key={label}
                            onClick={action}
                            className={`cursor-pointer ${
                              destructive
                                ? "text-destructive focus:text-destructive"
                                : ""
                            }`}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
}

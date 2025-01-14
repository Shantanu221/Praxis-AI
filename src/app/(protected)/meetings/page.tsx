"use client";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import useRefetch from "@/hooks/use-refetch";

const SkeletonLoader = () => (
  <li className="flex animate-pulse items-center justify-between gap-x-6 py-5">
    <div className="w-full">
      <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-3 w-1/4 rounded bg-gray-200"></div>
        <div className="h-3 w-1/6 rounded bg-gray-200"></div>
      </div>
    </div>
    <div className="flex flex-none items-center gap-x-4">
      <div className="h-8 w-20 rounded bg-gray-300"></div>
      <div className="h-8 w-20 rounded bg-gray-300"></div>
    </div>
  </li>
);

const NoMeetingsFound = () => (
  <div className="mt-8 flex flex-col items-center gap-4 text-center text-gray-500">
    <p className="text-lg font-semibold">No Meetings Found</p>
    <p>Start summarising your first meeting!</p>
  </div>
);

const MeetingsPage = () => {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery({
    projectId,
  });
  const deleteMeeting = api.project.deleteMeeting.useMutation();
  const refetch = useRefetch();

  return (
    <>
      <MeetingCard />
      <div className="h-6"></div>
      <h1 className="text-xl font-semibold">Meetings</h1>
      {!isLoading && meetings?.length === 0 && <NoMeetingsFound />}
      {isLoading && (
        <ul className="divide-y divide-gray-200">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </ul>
      )}
      <ul className="divide-y divide-gray-200">
        {meetings?.map((meeting: any) => (
          <li
            key={meeting.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-sm font-semibold"
                  >
                    {meeting.name}
                  </Link>
                  {meeting.status === "PROCESSING" && (
                    <Badge className="bg-yellow-500 text-white">
                      Processing...
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-x-2 text-xs text-gray-500">
                <p className="white-space-nowrap">
                  {meeting.createdAt.toLocaleDateString()}
                </p>
                <p className="truncate">{meeting.issues?.length} issues</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link href={`/meetings/${meeting.id}`}>
                <Button variant="outline" size="sm">
                  View Meetings
                </Button>
              </Link>
              <Button
                disabled={deleteMeeting.isPending}
                size="sm"
                variant="destructive"
                onClick={() => {
                  deleteMeeting.mutate(
                    { meetingId: meeting.id },
                    {
                      onSuccess: () => {
                        toast.success("Meeting deleted successfully");
                        refetch();
                      },
                    },
                  );
                }}
              >
                Delete Meeting
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MeetingsPage;

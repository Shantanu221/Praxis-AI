import React from "react";
import IssuesList from "./issues-list";

//new next 15 feature where you can no longer destructure the params,use have to use promise
type Props = {
  params: Promise<{ meetingId: string }>;
};

const MeetingDetailsPage = async ({ params }: Props) => {
  const { meetingId } = await params;
  return <IssuesList meetingId={meetingId} />;
};

export default MeetingDetailsPage;

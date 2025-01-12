"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const SkeletonLoader = () => (
  <div className="flex animate-pulse items-center gap-4 rounded-lg border bg-gray-100 p-4 shadow">
    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
    <div className="flex flex-col gap-2">
      <div className="h-4 w-48 rounded bg-gray-300"></div>
      <div className="h-3 w-36 rounded bg-gray-200"></div>
    </div>
  </div>
);

const NoQuestionsFound = () => (
  <div className="mt-8 flex flex-col items-center gap-4 text-center text-gray-500">
    <p className="text-lg font-semibold">No Questions Found</p>
    <p>Start by asking your first question using the button above!</p>
  </div>
);

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions, isLoading } = api.project.getQuestions.useQuery({
    projectId,
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="h-2"></div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : questions?.length ? (
          questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow">
                  <img
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={question.user.imageUrl ?? ""}
                    alt="User"
                  />
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <p className="line-clamp-1 text-lg font-medium text-gray-700">
                        {question.question}
                      </p>
                      <span className="whitespace-nowrap text-xs text-gray-400">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {question.answer}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
            </React.Fragment>
          ))
        ) : (
          <NoQuestionsFound />
        )}
      </div>

      {question && (
        <SheetContent className="sm:max-w-[80vw]">
          <SheetHeader>
            <SheetTitle>{question.question}</SheetTitle>
            <MDEditor.Markdown
              source={question.answer}
              className="custom-scrollbar !h-full max-h-[40vh] max-w-[70vw] overflow-scroll rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-800"
            />
            <CodeReferences
              filesReferences={(question.fileReferences ?? []) as any}
            />
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;

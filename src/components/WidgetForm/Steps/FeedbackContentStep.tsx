import { ArrowLeft, Camera } from "phosphor-react";
import { useState, FormEvent } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, SetScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendFeedback, setIsSendFeedback] = useState(false)

  async function HandleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendFeedback(true)
    await api.post('trello-feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
      company: "",
      name: `[IBREP] ${feedbackType}`,
      desc: comment,
      pos: "top",
      idList: "627a66de4c30953a0fc30a3f",
      due: "",
      dueComplete: false,
      idLabels: "627bf1764f9ecd447c2bd4bd",
      idMembers: "",
      urlSource: "",
      fileSource: "",
      idCardSource: "",
      keepFromSource: ""
    })



    onFeedbackSent();
    setIsSendFeedback(false)
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={HandleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={SetScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendFeedback }
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            { isSendFeedback ? <Loading /> : 'Enviar Feedback' }
          </button>
        </footer>
      </form>
    </>
  );
}

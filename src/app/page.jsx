"use client";

import React, { useState, useRef, useEffect } from "react";
import BoxQuestion from "@/components/boxQuestion";
import ContainerAnswer from "@/components/containerAnswer";
import InputQuestion from "@/components/inputQuestion";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { motion } from "framer-motion";
import LoadingBolt from "@/components/loadingIcon";
import { runAI, updateData } from "@/libs/api-libs";
import useAIModel from "@/hooks/useModelAI";
import { authUserSession } from "@/libs/auth-session";
import { checkLastStudy } from "@/libs/check";
import { Alert } from "@nextui-org/react";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyGemini, setHistoryGemini] = useState([]);
  const scrollRef = useRef(null);
  const inputContent = useRef(null);
  const latestQuestionRef = useRef(null);
  const [studyTime, setStudyTime] = useState({ day: 0, hour: 0 });
  const [showAlert, setShowAlert] = useState(false);

  const AIModel = useAIModel((state) => state.AIModel);
  const { session } = authUserSession();

  useEffect(() => {
    const fetchData = async () => {
      const result = await checkLastStudy(session);
      if (result) {
        const { diffInDays, diffInHours } = result;
        setStudyTime({ day: diffInDays || 0, hour: diffInHours || 0 });

        const alertShown = localStorage.getItem("alertShown");
        if (diffInDays >= 1 && diffInHours > 15 && !alertShown) {
          setShowAlert(true);
          localStorage.setItem("alertShown", "true");
        }
      }
    };

    fetchData();
  }, [session]);

  const handleClick = async () => {
    const question = inputContent.current.value.trim();

    if (!question) return;
    setShowAlert(false);

    inputContent.current.value = "";

    const newEntry = { question, answer: "", loading: true };
    setHistory((prevHistory) => [...prevHistory, newEntry]);

    setTimeout(() => {
      scrollToBottom();
    }, 150);

    setLoading(true);

    try {
      const response = await runAI(AIModel, question, historyGemini);

      const { choices } = response.data.body;

      if (response) {
        await updateData("user", session?.user.id);
      }
      if (choices && choices.length > 0) {
        const answer = choices[0].message.content;
        newEntry.answer = answer;
        newEntry.loading = false;
        setHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1] = newEntry;
          return updatedHistory;
        });
        if (AIModel.toLowerCase().startsWith("gemini")) {
          setHistoryGemini([
            ...historyGemini,
            { role: "user", parts: [{ text: question }] },
            { role: "model", parts: [{ text: answer }] },
          ]);
        }
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      newEntry.answer = `Network error, Please type again.`;
      newEntry.loading = false;
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[updatedHistory.length - 1] = newEntry;
        return updatedHistory;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleQuestionClick = (question) => {
    inputContent.current.value = question;
    handleClick();
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const renderHistory = () =>
    history.map((entry, index) => (
      <div key={index} className="mb-4">
        <div
          className="flex justify-end"
          ref={index === history.length - 1 ? latestQuestionRef : null}
        >
          <div className="mb-2 bg-[#00000068] dark:bg-[#ffffff4d] py-2 px-3 rounded-b-xl rounded-tl-xl text-right inline-block min-w-[fit-content]">
            <h3 className="text-white">{entry.question}</h3>
          </div>
        </div>
        {entry.loading ? (
          <LoadingBolt />
        ) : (
          <ContainerAnswer text={entry.answer} />
        )}
      </div>
    ));

  const renderContent = () => {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-7"
        >
          <h2 className="gradient-text text-[45px] font-semibold">
            Hello {session?.user.name}
          </h2>
          <p className="text-[20px] font-semibold opacity-50 tracking-[1px] dark:text-white">
            Mau belajar apa hari ini?
          </p>
        </motion.div>

        <div className="flex flex-col h-[50vh] justify-center">
          <BoxQuestion onQuestionClick={handleQuestionClick} />
        </div>
      </>
    );
  };
  // console.log(showAlert);

  return (
    <section className="relative pt-[65px]">
      <div className="w-[350px] sm:w-[430px] fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <Alert
          variant="solid"
          color={"danger"}
          isVisible={showAlert}
          title={`Anda Sudah lama tidak belajar selama ${studyTime.day} Hari ${studyTime.hour} Jam, ayo belajar!`}
          onClick={() => setShowAlert(false)}
        />
      </div>

      {history.length > 0 ? (
        <ScrollShadow
          ref={scrollRef}
          size={20}
          hideScrollBar
          className="w-[93%] mt-[5px] h-[72vh] mx-auto sm:w-[70%] sm:h-[78vh] sm:mt-[20px] relative dark:text-[#fafafa]"
        >
          {renderHistory()}
        </ScrollShadow>
      ) : (
        renderContent()
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <InputQuestion
          ref={inputContent}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          isSubmitted={loading}
        />
      </form>
    </section>
  );
};

export default Home;

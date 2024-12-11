"use client"

import { dataQuestions } from "@/data/dataQuestion";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BoxQuestion = ({ onQuestionClick }) => {
  const [showCards, setShowCards] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState([]);

  useEffect(() => {
    const randomQuestions = shuffle(dataQuestions).slice(0, 4);
    setRandomQuestions(randomQuestions);
    setShowCards(true);
  }, []);

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleQuestionClick = (question) => {
    onQuestionClick(question);
  };

  return (
    <div className="sm:w-[45%] gap-5 mx-auto grid grid-cols-2 place-items-center">
      {showCards &&
        randomQuestions.map((data, index) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: index * 0.1,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuestionClick(data.question)}
          >
            <Card className="bg-[#00000083] rounded-md cursor-pointer w-[150px] h-[130px] sm:w-[250px] hover:bg-[#00000043]">
              <CardBody className="flex justify-center items-center">
                <p className="text-[13px] text-white text-center">
                  {data.question}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
    </div>
  );
};

export default BoxQuestion;

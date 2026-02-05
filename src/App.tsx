import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "./components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card";

// Array of Arabic letters (28 letters) with updated names
const arabicLetters = [
  {
    letter: "ا",
    name: "Алиф",
    pronunciation: "Длинный звук «а»",
    audioSrc: "/audio/alif.mp3",
    tajweedRules: ["Маркер удлинения"],
  },
  {
    letter: "ب",
    name: "Ба",
    pronunciation: "Звук «б»",
    audioSrc: "/audio/ba.mp3",
    tajweedRules: ["Четкая артикуляция"],
  },
  {
    letter: "ت",
    name: "Та",
    pronunciation: "Звук «т»",
    audioSrc: "/audio/ta.mp3",
    tajweedRules: ["Четкое произношение"],
  },
  {
    letter: "ث",
    name: "Са",
    pronunciation: "Звук «θ» (как в английском 'think')",
    audioSrc: "/audio/tha.mp3",
    tajweedRules: ["Свистящий звук"],
  },
  {
    letter: "ج",
    name: "Джим",
    pronunciation: "Звук «дж»",
    audioSrc: "/audio/jeem.mp3",
    tajweedRules: ["Произносится с задней части горла"],
  },
  {
    letter: "ح",
    name: "Хьа",
    pronunciation: "Глубокий беззвучный звук «х»",
    audioSrc: "/audio/ha.mp3",
    tajweedRules: ["Глубокий горловой звук"],
  },
  {
    letter: "خ",
    name: "Хо",
    pronunciation: "Гортанный звук «х»",
    audioSrc: "/audio/kha.mp3",
    tajweedRules: ["Гортанный"],
  },
  {
    letter: "د",
    name: "Даль",
    pronunciation: "Звук «д»",
    audioSrc: "/audio/dal.mp3",
    tajweedRules: ["Четкий звук"],
  },
  {
    letter: "ذ",
    name: "Заль",
    pronunciation: "Звук «ð» (как в английском 'this')",
    audioSrc: "/audio/thal.mp3",
    tajweedRules: ["Отчетливый"],
  },
  {
    letter: "ر",
    name: "Ро",
    pronunciation: "Звук «р»",
    audioSrc: "/audio/ra.mp3",
    tajweedRules: ["Легкое дрожание"],
  },
  {
    letter: "ز",
    name: "За",
    pronunciation: "Звук «з»",
    audioSrc: "/audio/zay.mp3",
    tajweedRules: ["Четкий звук"],
  },
  {
    letter: "س",
    name: "Син",
    pronunciation: "Звук «с»",
    audioSrc: "/audio/seen.mp3",
    tajweedRules: ["Шипящий"],
  },
  {
    letter: "ش",
    name: "Шин",
    pronunciation: "Звук «ш»",
    audioSrc: "/audio/sheen.mp3",
    tajweedRules: ["Четкий звук"],
  },
  {
    letter: "ص",
    name: "Сод",
    pronunciation: "Тяжёлый звук «с»",
    audioSrc: "/audio/sad.mp3",
    tajweedRules: ["Эмфатический"],
  },
  {
    letter: "ض",
    name: "Дод",
    pronunciation: "Тяжёлый звук «д»",
    audioSrc: "/audio/dad.mp3",
    tajweedRules: ["Эмфатический"],
  },
  {
    letter: "ط",
    name: "Т1о",
    pronunciation: "Тяжёлый звук «т»",
    audioSrc: "/audio/taa.mp3",
    tajweedRules: ["Эмфатический"],
  },
  {
    letter: "ظ",
    name: "Зо",
    pronunciation: "Тяжёлый звук «з»",
    audioSrc: "/audio/zaa.mp3",
    tajweedRules: ["Эмфатический"],
  },
  {
    letter: "ع",
    name: "1айн",
    pronunciation: "Глубокий горловой звук",
    audioSrc: "/audio/ain.mp3",
    tajweedRules: ["Гортанный"],
  },
  {
    letter: "غ",
    name: "Г1ойн",
    pronunciation: "Хриплый горловой звук",
    audioSrc: "/audio/ghain.mp3",
    tajweedRules: ["Гортанный"],
  },
  {
    letter: "ف",
    name: "Фа",
    pronunciation: "Звук «ф»",
    audioSrc: "/audio/fa.mp3",
    tajweedRules: ["Лабиодентальный"],
  },
  {
    letter: "ق",
    name: "Къоф",
    pronunciation: "Глубокий звук «к»",
    audioSrc: "/audio/qaf.mp3",
    tajweedRules: ["Эмфатический"],
  },
  {
    letter: "ك",
    name: "Каф",
    pronunciation: "Звук «к»",
    audioSrc: "/audio/kaf.mp3",
    tajweedRules: ["Четкий"],
  },
  {
    letter: "ل",
    name: "Льам",
    pronunciation: "Звук «л»",
    audioSrc: "/audio/lam.mp3",
    tajweedRules: ["Четкий"],
  },
  {
    letter: "م",
    name: "Мим",
    pronunciation: "Звук «м»",
    audioSrc: "/audio/meem.mp3",
    tajweedRules: ["Четкий"],
  },
  {
    letter: "ن",
    name: "Нун",
    pronunciation: "Звук «н»",
    audioSrc: "/audio/noon.mp3",
    tajweedRules: ["Четкий"],
  },
  {
    letter: "ه",
    name: "Х1а",
    pronunciation: "Звук «х»",
    audioSrc: "/audio/ha2.mp3",
    tajweedRules: ["Мягкий"],
  },
  {
    letter: "و",
    name: "Вав",
    pronunciation: "Звук «в»",
    audioSrc: "/audio/waw.mp3",
    tajweedRules: ["Четкий"],
  },
  {
    letter: "ي",
    name: "Йа",
    pronunciation: "Звук «й»",
    audioSrc: "/audio/ya.mp3",
    tajweedRules: ["Четкий"],
  },
];

// Global pool of letter names
const letterNames = arabicLetters.map((letter) => letter.name);

// Fisher-Yates shuffle function
const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Function to generate randomized question with dynamic answer options
function generateRandomizedQuestion(
  question: (typeof arabicLetters)[0],
  pool: string[]
) {
  const correctAnswer = question.name;
  const candidateOptions = pool.filter((name) => name !== correctAnswer);
  const wrongOptions = shuffleArray(candidateOptions).slice(0, 2);
  const options = shuffleArray([...wrongOptions, correctAnswer]);
  const correctIndex = options.findIndex((opt) => opt === correctAnswer);
  return { ...question, options, correctIndex };
}

type ArabicLetter = (typeof arabicLetters)[number];

interface RandomizedQuestion extends ArabicLetter {
  options: string[];
  correctIndex: number;
}

const initialScore = {
  total: 0,
  correct: 0,
  incorrect: 0,
  streak: 0,
  maxStreak: 0,
};

const ArabicLetterGame = () => {
  // Flag for showing instructions before the game starts
  const [hasStarted, setHasStarted] = useState(false);

  const [letters, setLetters] = useState(shuffleArray(arabicLetters));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    { letter: string; correctAnswer: string; userAnswer: string }[]
  >([]);
  const [score, setScore] = useState(initialScore);
  const [gameOver, setGameOver] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(() => Date.now());
  const [, setTimerTick] = useState(0);
  const [overallTimer, setOverallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const nextQuestionTimeoutRef = useRef<number | null>(null);

  const currentLetter = letters[currentQuestion] ?? letters[0];
  const randomizedQuestion: RandomizedQuestion = useMemo(
    () => generateRandomizedQuestion(currentLetter, letterNames),
    [currentLetter]
  );

  const questionTimer = Math.floor((Date.now() - questionStartTime) / 1000);

  useEffect(() => {
    if (currentLetter) {
      setSelectedAnswerIndex(null);
      setQuestionStartTime(Date.now());
      setTimerTick((prev) => prev + 1);
    }
  }, [currentLetter]);

  // Update per-question timer only if game is active.
  useEffect(() => {
    if (!hasStarted || gameOver) return;
    const interval = setInterval(() => {
      setTimerTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, hasStarted]);

  // Start overall timer only if the game has started and is not over
  useEffect(() => {
    if (!hasStarted || gameOver) return;
    const interval = setInterval(() => {
      setOverallTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, hasStarted]);

  useEffect(() => {
    setAnswerSelected(false);
    if (audioRef.current && !isMuted) {
      audioRef.current
        .play()
        .catch((err) =>
          console.error("Ошибка при воспроизведении аудио:", err)
        );
    }
  }, [currentQuestion, isMuted]);

  useEffect(() => {
    return () => {
      if (nextQuestionTimeoutRef.current) {
        window.clearTimeout(nextQuestionTimeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = useCallback((selectedIndex: number) => {
    if (answerSelected) return;

    setAnswerSelected(true);
    setSelectedAnswerIndex(selectedIndex);
    const isCorrect = selectedIndex === randomizedQuestion.correctIndex;
    if (!isCorrect) {
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          letter: randomizedQuestion.letter,
          correctAnswer:
            randomizedQuestion.options[randomizedQuestion.correctIndex],
          userAnswer: randomizedQuestion.options[selectedIndex],
        },
      ]);
    }
    setScore((prev) => ({
      total: prev.total + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: isCorrect ? prev.incorrect : prev.incorrect + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
      maxStreak: isCorrect
        ? Math.max(prev.maxStreak, prev.streak + 1)
        : prev.maxStreak,
    }));

    nextQuestionTimeoutRef.current = window.setTimeout(() => {
      if (currentQuestion + 1 < letters.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 500);
  }, [answerSelected, currentQuestion, letters.length, randomizedQuestion]);

  const restartGame = useCallback(() => {
    if (nextQuestionTimeoutRef.current) {
      window.clearTimeout(nextQuestionTimeoutRef.current);
    }
    setLetters(shuffleArray(arabicLetters));
    setCurrentQuestion(0);
    setIncorrectAnswers([]);
    setScore(initialScore);
    setGameOver(false);
    setQuestionStartTime(Date.now());
    setOverallTimer(0);
    setAnswerSelected(false);
    setSelectedAnswerIndex(null);
  }, []);

  const progressPercent = ((currentQuestion + 1) / letters.length) * 100;

  // Instructions screen, aligned similarly to the game screen
  // Instructions screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Инструкции</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Добро пожаловать в игру "Изучаем арабские буквы"! В этой игре вам
              будет показана арабская буква, и ваша задача — выбрать правильное
              название буквы из предложенных вариантов.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              На экране вы увидите таймер, который показывает время, прошедшее с
              начала игры. Игра ведёт подсчет правильных и неправильных ответов,
              а также вашей текущей серии. После завершения игры вам будут
              показаны подробные результаты.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => setHasStarted(true)}
                className="text-base sm:text-lg px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
              >
                Начать игру
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

// Results screen
if (gameOver) {
  const avgTime = score.total ? (overallTimer / score.total).toFixed(1) : 0;
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            Результаты игры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-base sm:text-base text-gray-800">
              Всего вопросов: {score.total}
            </p>
            <p className="text-base sm:text-base text-gray-800">
              Правильных ответов: {score.correct}
            </p>
            <p className="text-base sm:text-base text-gray-800">
              Неправильных ответов: {score.incorrect}
            </p>
            <p className="text-base sm:text-base text-gray-800">
              Точность:{" "}
              {score.total
                ? ((score.correct / score.total) * 100).toFixed(2)
                : 0}
              %
            </p>
            <p className="text-base sm:text-base text-gray-800">
              Максимальная серия: {score.maxStreak}
            </p>
            <p className="text-base sm:text-base text-gray-800">
              Общее время: {overallTimer} секунд
            </p>
            <p className="text-base sm:text-base text-gray-800">
              Среднее время на вопрос: {avgTime} сек.
            </p>

            {incorrectAnswers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl mb-4">
                  Просмотр неправильных ответов:
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm sm:text-base">
                    <thead>
                      <tr>
                        <th className="px-3 py-2">Буква</th>
                        <th className="px-3 py-2">Правильный ответ</th>
                        <th className="px-3 py-2">Ваш ответ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incorrectAnswers.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2">{item.letter}</td>
                          <td className="px-3 py-2 text-green-600">
                            {item.correctAnswer}
                          </td>
                          <td className="px-3 py-2 text-red-600">
                            {item.userAnswer}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {incorrectAnswers.length === 0 && (
              <p className="mt-6 text-green-600 text-lg sm:text-xl">
                Отличная работа! Вы ответили правильно на все вопросы!
              </p>
            )}

            {/* Only "Перезапустить игру" button is shown on the results screen */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={restartGame}
                className="px-4 py-2 text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Перезапустить игру
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


// Main game screen
return (
  <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
    {/* Progress bar */}
    <div className="w-full max-w-md mx-auto mb-4" dir="rtl">
      <div className="bg-gray-300 rounded-full h-1">
        <div
          className="bg-blue-600 h-1 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>

    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-xl sm:text-2xl">
          <span>Изучаем арабские буквы</span>
          <Button
            onClick={() => setIsMuted(!isMuted)}
            className="px-3 py-2 text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {isMuted ? "🔇" : "🔊"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <m.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              <m.h2
                className="text-7xl sm:text-8xl mb-8 cursor-pointer transition hover:scale-105"
                onClick={() => {
                  if (audioRef.current && !isMuted) {
                    audioRef.current.play().catch(console.error);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {randomizedQuestion.letter}
              </m.h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Таймер: {questionTimer} секунд
              </p>
            </m.div>
          </AnimatePresence>

        <audio ref={audioRef} src={randomizedQuestion.audioSrc} hidden />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {randomizedQuestion.options.map((option, index) => (
            <m.div
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleAnswer(index)}
                disabled={answerSelected}
                className={`text-lg sm:text-xl py-4 w-full ${
                  answerSelected && selectedAnswerIndex === index
                    ? selectedAnswerIndex === randomizedQuestion.correctIndex
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {option}
              </Button>
            </m.div>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="flex justify-around items-center text-base sm:text-lg">
              <div className="flex items-center">
                <span>Правильно: </span>
                <span className="ml-2 text-green-600">{score.correct}</span>
              </div>
              <div className="flex items-center">
                <span>Неправильно: </span>
                <span className="ml-2 text-red-600">{score.incorrect}</span>
              </div>
              <div className="flex items-center">
                <span>Серия: </span>
                <span className="ml-2 text-blue-600">{score.streak}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setGameOver(true)}
              className="px-4 py-2 text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Завершить игру
            </Button>
            <Button
              onClick={restartGame}
              className="px-4 py-2 text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Перезапустить игру
            </Button>
          </div>
        </LazyMotion>
      </CardContent>
      </Card>
    </div>
  );
};

export default ArabicLetterGame;

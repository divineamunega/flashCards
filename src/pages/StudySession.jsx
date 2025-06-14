import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { Dice1 } from "lucide-react";

const LOCAL_STORAGE_KEY = "deck_flashcards";

const StudySession = () => {
    const { deckName } = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return;

        try {
            const data = JSON.parse(raw);

            const deck = data[deckName];
            console.log(deck);

            if (!deck || !Array.isArray(deck)) {
                throw new Error("Invalid deck or no cards.");
            }

            setCards(deck);
        } catch (err) {
            console.error("Deck data corrupted.");
        }
    }, [deckName]);

    const handleNext = () => {
        setShowAnswer(false);
        setIndex((prev) => prev + 1);
    };

    const handleFinish = () => {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return;

        const data = JSON.parse(raw);
        if (data[deckName]) {
            data[deckName].lastStudied = new Date().toISOString();
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        }

        navigate("/dashboard");
    };

    if (cards.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                <p>No flashcards available for this deck.</p>
            </div>
        );
    }

    const current = cards[index];

    return (
        <div>
            <Navbar type="secondary" />
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-6 text-center">
                <h2 className="text-xl font-bold text-gray-700">
                    {deckName.toUpperCase()}
                </h2>

                <div
                    className="border border-gray-300 p-6 rounded-lg bg-gray-50 cursor-pointer min-h-[150px] flex items-center justify-center text-lg font-medium"
                    onClick={() => setShowAnswer((s) => !s)}
                >
                    {showAnswer ? current.answer : current.question}
                </div>

                <div className="space-x-4">
                    {index < cards.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 rounded bg-indigo-600 text-white"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            className="px-6 py-2 rounded bg-green-600 text-white"
                        >
                            Finish Study
                        </button>
                    )}
                </div>

                <p className="text-sm text-gray-400">
                    Card {index + 1} of {cards.length}
                </p>
            </div>
        </div>
    );
};

export default StudySession;

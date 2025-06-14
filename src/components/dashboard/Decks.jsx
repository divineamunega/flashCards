import { useEffect, useState } from "react";
import Deck from "./Deck";
import { BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Plus } from "lucide-react";

const LOCAL_STORAGE_KEY = "deck_flashcards";

const Decks = () => {
    const [decks, setDecks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        let parsed = {};

        try {
            parsed = raw ? JSON.parse(raw) : {};
            if (typeof parsed !== "object" || Array.isArray(parsed)) {
                throw new Error("Invalid deck structure.");
            }
        } catch (err) {
            console.warn("Corrupt localStorage. Resetting.");
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            parsed = {};
        }

        const formatted = Object.entries(parsed).map(([name, value]) => ({
            name,
            description: value.description || "No description",
            number: Array.isArray(value.cards) ? value.cards.length : 0,
            date: value.lastStudied || "N/A",
            tag: value.tag || "Untagged",
        }));

        setDecks(formatted);
    }, []);

    const handleDelete = (name) => {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return;

        const data = JSON.parse(raw);
        delete data[name];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        setDecks((prev) => prev.filter((d) => d.name !== name));
    };

    const handleStudy = (name) => {
        // Placeholder for routing or flashcard session logic
        console.log("Study:", name);
        navigate(`/study/${name}`);
    };

    if (decks.length === 0) {
        return (
            <div className="w-[100%] px-16 mt-10 pb-10">
                <div className="bg-white  w-[100%] py-20 rounded-[10px] flex justify-center">
                    <div className="w-[20rem] align-middle text-center">
                        <BookOpen
                            size={65}
                            className="text-gray-400 align-middle justify-center flex items-center m-auto mt-10"
                        />
                        <h2 className="font-medium text-[20px] mt-4">
                            No decks yet
                        </h2>
                        <div className="whitespace-nowrap text-center mt-2 text-[18px] text-gray-500 m-auto flex justify-center items-center">
                            Create your first deck by uploading a PDF or
                            entering text
                        </div>
                        <Link
                            to="/generate"
                            className="cursor-pointer text bg-gradient-to-r from-[#52357B] to-[#5459AC] text-white px-12 py-2 rounded-xl flex items-center gap-3 hover:opacity-80 mt-5"
                        >
                            <div>
                                <Plus />
                            </div>

                            <div>Create your First Deck</div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[100%]">
            <div className="w-[100%] py-20 rounded-[10px]  px-14 justify-center  grid grid-cols-3">
                {decks.map((deck) => (
                    <Deck
                        key={deck.name}
                        {...deck}
                        onDelete={() => handleDelete(deck.name)}
                        onStudy={() => handleStudy(deck.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Decks;

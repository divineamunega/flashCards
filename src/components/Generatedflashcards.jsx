import { useState } from "react";
import { Trash2, Save } from "lucide-react";
import Button from "./Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const GeneratedFlashcards = ({ flashcards, onSave }) => {
    const [cards, setCards] = useState(flashcards);
    const [isSaving, setIsSaving] = useState(false);
    const [deckName, setDeckName] = useState("");
    const navigate = useNavigate();

    const updateCard = (index, field, value) => {
        const updated = [...cards];
        updated[index][field] = value;
        setCards(updated);
    };

    const deleteCard = (index) => {
        const updated = [...cards];
        updated.splice(index, 1);
        setCards(updated);
    };

    const saveToLocalDeck = async () => {
        if (!deckName.trim()) {
            toast.error("Please enter a deck name.");
            return;
        }

        setIsSaving(true);
        toast.info("Saving flashcards...");

        await new Promise((res) => setTimeout(res, 1000)); // simulate delay

        let allDecks = {};

        try {
            const raw = localStorage.getItem("deck_flashcards");

            if (raw) {
                const parsed = JSON.parse(raw);
                if (typeof parsed === "object" && !Array.isArray(parsed)) {
                    allDecks = parsed;
                } else {
                    throw new Error("Invalid deck_flashcards structure.");
                }
            }
        } catch (err) {
            console.warn("Corrupt or missing localStorage. Resetting decks.");
            allDecks = {};
        }

        const existingDeck = allDecks[deckName.trim()] || [];
        const updatedDeck = [...existingDeck, ...cards];
        const updatedDecks = {
            ...allDecks,
            [deckName.trim()]: updatedDeck,
        };

        try {
            localStorage.setItem(
                "deck_flashcards",
                JSON.stringify(updatedDecks)
            );
            toast.success(`Deck "${deckName}" saved!`);
            navigate("/dashboard");
            if (onSave) onSave(cards);
        } catch (err) {
            console.error("LocalStorage write failed:", err);
            toast.error("Failed to save. Storage might be full.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mt-8 space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
                ✨ Generated Flashcards
            </h2>

            <input
                type="text"
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter deck name (e.g., Biology)"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
            />

            {cards.length === 0 ? (
                <p className="text-gray-500 italic">No flashcards available.</p>
            ) : (
                <div className="grid gap-6">
                    {cards.map((card, i) => (
                        <div
                            key={i}
                            className="relative rounded-xl border border-gray-300 p-4 bg-gray-50 hover:shadow transition"
                        >
                            <textarea
                                className="w-full text-base font-semibold bg-transparent resize-none mb-2 outline-none border-b border-gray-300 focus:border-indigo-500"
                                value={card.question}
                                onChange={(e) =>
                                    updateCard(i, "question", e.target.value)
                                }
                            />
                            <textarea
                                className="w-full text-sm text-gray-700 bg-transparent resize-none outline-none"
                                value={card.answer}
                                onChange={(e) =>
                                    updateCard(i, "answer", e.target.value)
                                }
                            />
                            <button
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={() => deleteCard(i)}
                                title="Delete flashcard"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Button
                handleClick={saveToLocalDeck}
                type="button"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2"
            >
                {isSaving ? (
                    <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-indigo-500 rounded-full"></span>
                ) : (
                    <Save />
                )}
                {isSaving ? "Saving..." : "Save to Deck"}
            </Button>
        </div>
    );
};

export default GeneratedFlashcards;

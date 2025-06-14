import { ArrowLeft, Brain, File, Upload } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { readFile } from "../services/pdf";
import { useState } from "react";
import { generateFlashcards } from "../services/ai";
import GeneratedFlashcards from "../components/Generatedflashcards";
const GenerateFlashCards = () => {
    const [pdfText, setPdfText] = useState("");

    const [flashcards, setFlashcards] = useState([]);

    console.log("flash", flashcards);

    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!pdfText.trim()) {
            toast.error("Please provide text input first");
            return;
        }

        setLoading(true);
        toast.info("Generating flashcards...");
        try {
            const result = await generateFlashcards(pdfText);
            setFlashcards(result);
            toast.success("Flashcards generated!");
        } catch (err) {
            toast.error("Failed to generate flashcards");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePdfUpload = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const buffer = event.target?.result;
            if (buffer instanceof ArrayBuffer) {
                try {
                    const text = await readFile(buffer);
                    setPdfText(text);
                    toast.success("PDF loaded successfully");
                } catch (error) {
                    toast.error("Failed to read PDF");
                    console.error(error);
                }
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="bg-gradient-to-r from-[#52357b1e] to-[#5458ac00]">
            <Navbar type="secondary" />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <button className="inline-flex items-center justify-center gap-2 text-sm font-medium h-10 px-4 py-2 rounded-full hover:bg-accent hover:text-accent-foreground">
                            <ArrowLeft />
                            Back to Dashboard
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Generate Flashcards
                            </h1>
                            <p className="text-gray-600">
                                Upload a PDF or paste text to create AI-powered
                                flashcards
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg text-card-foreground bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <div className="text-2xl font-semibold flex items-center gap-2">
                                <Upload />
                                Content Input
                            </div>
                        </div>
                        <div className="p-6 pt-0 space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Upload PDF
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                    <input
                                        accept=".pdf"
                                        className="hidden"
                                        id="pdf-upload"
                                        type="file"
                                        onChange={handlePdfUpload}
                                    />
                                    <label
                                        htmlFor="pdf-upload"
                                        className="cursor-pointer flex flex-col items-center gap-2"
                                    >
                                        <File />
                                        <p className="text-gray-600">
                                            Click to upload a PDF file
                                        </p>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Or paste text content
                                </label>
                                <textarea
                                    className="w-full border px-3 py-2 rounded-xl min-h-[200px]"
                                    placeholder="Paste your study material here..."
                                    value={pdfText}
                                    onChange={(e) => setPdfText(e.target.value)}
                                />
                            </div>

                            <Button
                                type="button"
                                handleClick={handleGenerate}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            />
                                        </svg>
                                        Generating...
                                    </div>
                                ) : (
                                    <>
                                        <Brain />
                                        Generate Flashcards
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {flashcards?.length > 0 && (
                    <GeneratedFlashcards flashcards={flashcards} />
                )}
            </div>
        </div>
    );
};

export default GenerateFlashCards;

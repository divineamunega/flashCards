const apiKey =
    "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";

/**
 * Converts plain text into flashcard-style Q&A JSON using OpenRouter
 * @param {string} text - Your full PDF text or pasted content
 */
export async function generateFlashcards(text) {
    const prompt = `
You are an AI that creates flashcards for studying.

Given the following content, extract important concepts and return a JSON array of flashcards.
Each flashcard must have a "question" and an "answer". Keep answers concise.

Return ONLY valid JSON, structured like:
[
  { "question": "What is ...?", "answer": "..." },
  { "question": "How does ... work?", "answer": "..." }
]

NO explanations, NO markdown, NO preamble — just the JSON array.
Content:
${text}
`;

    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-8b-instruct:free",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            }),
        }
    );

    const result = await response.json();
    console.log(result);

    try {
        const content = result.choices?.[0]?.message?.content?.trim();
        const flashcards = JSON.parse(content);
        console.log(flashcards); // Debug output
        return flashcards;
    } catch (err) {
        console.error("Failed to parse AI response as JSON", err);
        console.log("Raw content:", result.choices?.[0]?.message?.content);
        return [];
    }
}

const API_URL = "https://api.jsonbin.io/v3/b";
const MASTER_KEY =
    "$2a$10$IuHwwk39DcpFr/3GCi70G.2UCW/Stauq30gdxdWpoQtzjTUAB.uLe"; // From API Keys page
const ACCESS_KEY =
    "$2a$10$pW.sSrZWutYAuIzhaHbHFOabPaCEs65mhBxClhW.jyoZB4hTpcZgK"; // Create & give 'Create Bin' access

export async function saveDeck(deckData) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY,
                "X-Access-Key": ACCESS_KEY,
                "X-Bin-Private": "false", // Make bin public
                "X-Bin-Name": deckData.name || "Unnamed Deck",
            },
            body: JSON.stringify(deckData),
        });

        const result = await response.json();
        console.log("Bin saved:", result);
        return result.metadata.id; // This is your BIN ID
    } catch (err) {
        console.error("Failed to save bin:", err);
        return null;
    }
}

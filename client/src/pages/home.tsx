import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch the flag data and set up the typewriter effect
  useEffect(() => {
    const fetchFlag = async () => {
      try {
        console.log("Starting fetch request to API...");

        // Fetch from the Lambda URL
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/747265"
        );
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log("API Response:", data);

        // Set up the typewriter effect
        const characters = Array.from(data.trim());
        let currentIndex = 0;

        // Add the first character immediately
        setDisplayText(characters[currentIndex++] || "");

        // Set up an interval to add the remaining characters
        const intervalId = setInterval(() => {
          if (currentIndex < characters.length) {
            setDisplayText((prev) => prev + characters[currentIndex++]);
          } else {
            clearInterval(intervalId);
            console.log("Typewriter animation complete");
          }
        }, 500);

        // Clean up the interval on unmount
        return () => clearInterval(intervalId);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  // Show loading state
  if (loading && displayText.length === 0) {
    return <div>Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the characters
  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {Array.from(displayText).map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
    </div>
  );
}

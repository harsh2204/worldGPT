export const startListening = async (
  onResult: (transcript: string) => void,
  onEnd: () => void
) => {
  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  let silenceStart = Date.now();

  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript.trim();
      if (event.results[i].isFinal) {
        onResult(transcript);
        silenceStart = Date.now();
      }
    }
  };

  recognition.onend = () => {
    if (Date.now() - silenceStart > 2500) {
      onEnd();
    } else {
      recognition.start();
    }
  };

  recognition.start();
};

export const speak = async (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

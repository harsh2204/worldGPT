export const speak = async (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

export const listen = async () => {
  return new Promise<string>((resolve) => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      recognition.stop();
      resolve(transcript);
    };

    recognition.onerror = (event: any) => {
      recognition.stop();
      resolve("");
    };
  });
};

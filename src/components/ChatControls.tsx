import { speak, listen } from '@/helpers/speech';
import { useControls } from 'leva';

interface ChatControlsProps {
  handleTranscript: (transcript: string) => void;
}

const ChatControls = (props: ChatControlsProps) => {
  // @ts-ignore
  const { listening } = useControls({
    listening: { value: false, onChange: (value) => handleListenClick(value) },
  });
  const handleListenClick = async (value) => {
    if (value) {
      const transcript = await listen();
      if (transcript) {
        // Send transcript to GPT-4 API and get response
        const response = 'Sample response from GPT-4';
        speak(response);
        props && props.handleTranscript && props.handleTranscript(response);

      }
    } else {
      // Stop microphone

    }

  };

  return <></>;
};

export default ChatControls;

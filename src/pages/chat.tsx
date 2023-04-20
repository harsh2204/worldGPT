import dynamic from 'next/dynamic';
import { SpotLight, Lightformer} from '@react-three/drei';
import {Color} from 'three';
const Character = dynamic(() => import('@/components/canvas/Character'), {
  ssr: false,
});

const ChatControls = dynamic(() => import('@/components/ChatControls'), {
  ssr: false,
});

function Floor() {
  const col = new Color('skyblue')
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[10]} />
      <meshStandardMaterial color={col}/>
    </mesh>
  )
}

const R3F = () => {
  return (
    <>
      <Character 
      scale={[0.01,0.01,0.01]} 
      position={[0,0,0]}
      />
      <SpotLight
        position={[2,5,0]}
        distance={5}
        angle={1.3}
        anglePower={15} // Diffuse-cone anglePower (default: 5)
      />
      <Lightformer
        form="ring" // circle | ring | rect (optional, default = rect)
        intensity={1} // power level (optional = 1)
        color="white" // (optional = white)
        scale={1} // Scale it any way you prefer (optional = [1, 1])
        target={[0, 5, 0]} // Target position (optional = undefined)
        rotation-y={-Math.PI/2}
      />
      <ChatControls handleTranscript={(script) => console.log(script)} />
      <axesHelper args={[5]} />
      <Floor />
    </>
  );
};

const DOM = () => {
  return (
    <>
      <div
        style={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 0,
            width: '100%'
          }
        }>UI TEXT</div>
    </>
  )
};

export default function Page() {
  return (
    <>
      <DOM />
      <R3F />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Chatbot',
    },
  };
}

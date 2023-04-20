import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer, AnimationAction, Object3D, LoopRepeat} from 'three';
import { useEffect, useRef } from 'react';
import { useControls } from 'leva';

// Generate the props for a character, including scale
type characterProps = {
  scale?: Array<number>,
  position?: Array<number> 
  rotation?: Array<number>
};

const Character = ({scale, position, rotation}:characterProps) => {
  const fbx = useLoader(FBXLoader, 'models/character.fbx');
  const mixer = useRef<AnimationMixer>();
  const actionMap: {[k:string] : AnimationAction} = {}
  let activeAction:AnimationAction
  let lastAction:AnimationAction
  const animation_names =  fbx.animations.map((clip) => clip.name.split('|')[1])
  
  useControls('Character', {
    animation: { options: animation_names,
      onChange: (v)=>{
          setAction(actionMap[v])
      }
    },
  });

  useEffect(() => {
    mixer.current = new AnimationMixer(fbx);
    fbx.animations.map((clip)=>{
      const action = mixer.current.clipAction(clip)
      const name = clip.name.split('|')[1]
      console.log('Adding action', name)
      actionMap[name] = action
    })
    setAction(actionMap[animation_names[0]])
    fbx.traverse((child: any) => {
      if (child.isMesh) {
        child.material.needsUpdate = true;
      }
    });
  }, [fbx]);
  const setAction = (toAction: AnimationAction) => {
    if (toAction != activeAction) {
        lastAction = activeAction
        activeAction = toAction
        //lastAction.stop()
        lastAction?.fadeOut(1)
        activeAction.reset()
        activeAction.fadeIn(1)
        activeAction.play()
    }
}


  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  // useEffect(() => {
  //   // Object.values(actions.current).forEach((action) => action.stop());
  //   console.log(actions)
  //   if (actions.current[animation]) {
  //     actions.current[animation].play();
  //   }
  // }, [animation]);

  return <primitive object={fbx} scale={scale} rotation={rotation} position={position}/>;
};

export default Character;

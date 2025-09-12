import minecraftClickSound from '../assets/minecraft-click.mp3';
import classicHurtSound from '../assets/classic-hurt.mp3';

// Pool de instâncias de áudio para reprodução simultânea sem atraso
const clickAudioPool = [];
const hurtAudioPool = [];
const POOL_SIZE = 5;
let clickPoolIndex = 0;
let hurtPoolIndex = 0;

// Inicializa os pools de áudio
const initializeAudioPools = () => {
  // Pool para som de clique
  for (let i = 0; i < POOL_SIZE; i++) {
    const clickAudio = new Audio(minecraftClickSound);
    clickAudio.preload = 'auto';
    clickAudio.volume = 0.7;
    clickAudioPool.push(clickAudio);
  }
  
  // Pool para som de hurt
  for (let i = 0; i < POOL_SIZE; i++) {
    const hurtAudio = new Audio(classicHurtSound);
    hurtAudio.preload = 'auto';
    hurtAudio.volume = 0.7;
    hurtAudioPool.push(hurtAudio);
  }
};

// Inicializa os pools quando o módulo é carregado
initializeAudioPools();

export const playClickSound = () => {
  try {
    const audio = clickAudioPool[clickPoolIndex];
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.log('Could not play click sound:', error);
    });
    
    // Avança para a próxima instância do pool
    clickPoolIndex = (clickPoolIndex + 1) % POOL_SIZE;
  } catch (error) {
    console.log('Error with click sound:', error);
  }
};

export const playHurtSound = () => {
  try {
    const audio = hurtAudioPool[hurtPoolIndex];
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.log('Could not play hurt sound:', error);
    });
    
    // Avança para a próxima instância do pool
    hurtPoolIndex = (hurtPoolIndex + 1) % POOL_SIZE;
  } catch (error) {
    console.log('Error with hurt sound:', error);
  }
};
export const Strings = {
  appName: 'GeoView',
  startGame: 'Start game',
  leaveGame: 'Leave the game?',
  leaveGameHint: 'You have unsaved changes. Are you sure to discard them and leave the screen?',
  stay: 'Stay',
  leave: 'Leave game',
  playNext: 'PLAY NEXT',
  XP: 'xp',
  playtime: 'Playtime'
};

export const getString = (str: string, params: string[]): string => {
  let newStr = str;
  for (let i = 0; i < params.length; ++i) {
    newStr = newStr.replace(`%${i + 1}`, params[i]);
  }

  return newStr;
};

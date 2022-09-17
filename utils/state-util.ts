import { ChangeEvent } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const set = (e: ChangeEvent<HTMLInputElement>, setter: (v: any) => void) => {
  setter(e.target.value);
};

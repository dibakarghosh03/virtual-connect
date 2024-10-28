import { atom } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export const userAtom = atom({
    key: 'userAtom',
    default: {
        firstName: '',
        lastName: '',
        email: '',
        image: '',
    },
    effects: [localStorageEffect('user')],
});

export const tokenAtom = atom({
    key: 'tokenAtom',
    default: '',
    effects: [localStorageEffect('token')],
});
'use client';

import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ModalSize } from 'rizzui';

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  className?: string;
  customSize?: string;
  size?: ModalSize;
};

const modalAtom = atom<ModalTypes>({
  isOpen: false,
  view: null,
  customSize: '320px',
  className: '',
  size: 'sm',
});

export function useModal() {
  const state = useAtomValue(modalAtom);
  const setState = useSetAtom(modalAtom);

  const openModal = ({
    view,
    customSize,
    className,
    size,
  }: {
    view: React.ReactNode;
    customSize?: string;
    className?: string;
    size?: ModalSize;
  }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      customSize,
      className,
      size,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}

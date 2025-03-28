export const menuVariants = {
  open: {
    width: '480px',
    height: '640px',
    top: '-8px',
    right: '-8px',
    borderRadius: '32px',
    transition: {duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },

  closed: {
    width: '48px',
    height: '48px',
    top: '0px',
    right: '0px',
    borderRadius: '32px',
    transition: {duration: 0.75, delay: 0.35, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },
}

export const perspectiveVariants = {
  initial: {
    opacity: 0,
    rotateX: 120,
    translateY: 90,
    translateX: -40,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: {duration: 0.35, delay: 0.4},
    },
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5, type: 'linear', ease: [0.76, 0, 0.24, 1]},
  },
}

export const slideInVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5, type: 'tween', ease: 'easeInOut'},
  },
}

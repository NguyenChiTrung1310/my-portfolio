export const toggleMenuVariants = (isTablet: boolean) => ({
  open: {
    top: '8px',
    right: '8px',
    x: isTablet ? '0px' : '-8px',
    y: isTablet ? '0px' : '8px',
    transition: {duration: 0.4, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },
  closed: {
    top: '0px',
    right: '0px',
    x: isTablet ? '0px' : '-16px',
    y: isTablet ? '0px' : '16px',
    transition: {duration: 0.8, delay: 0.3, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },
})

export const menuVariants = (isTablet: boolean) => ({
  open: {
    width: isTablet ? '480px' : '100vw',
    height: isTablet ? '640px' : '100vh',
    top: '0px',
    right: '0px',
    borderRadius: isTablet ? '32px' : '0px',
    transition: {duration: 0.75, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },

  closed: {
    width: '48px',
    height: '48px',
    top: !isTablet ? '16px' : '0px',
    right: !isTablet ? '16px' : '0px',
    borderRadius: '32px',
    transition: {duration: 0.75, delay: 0.35, type: 'tween', ease: [0.76, 0, 0.24, 1]},
  },
})

export const perspectiveVariants = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 90,
    translateX: -70,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.4 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: {duration: 0.4, delay: 0.4},
    },
  }),
  exit: {
    opacity: 0,
    transition: {duration: 0.5, type: 'linear', ease: [0.76, 0, 0.24, 1], opacity: {delay: 0.4}},
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
    transition: {duration: 0.5, type: 'tween', ease: 'easeInOut', opacity: {delay: 0.4}},
  },
}

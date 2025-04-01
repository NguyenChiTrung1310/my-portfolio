/**
 * ===============
 * INNER TRANSITION
 * ===============
 */
export const perspective = {
  initial: {
    scale: 1,
    y: 0,
  },
  enter: {
    scale: 1,
    y: 0,
  },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

export const slide = {
  initial: {
    y: '100vh',
  },
  enter: {
    y: '100vh',
  },
  exit: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
  },
}

/**
 * ===============
 * CURVE TRANSITION
 * ===============
 */
export const text = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: {duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1]},
    transitionEnd: {top: '40%'},
  },
  exit: {
    opacity: 1,
    top: '50%',
    transition: {duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1]},
  },
}

export const curve = (initialPath: any, targetPath: any) => {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: {duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1]},
    },
    exit: {
      d: initialPath,
      transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1]},
    },
  }
}

export const translate = {
  initial: {
    top: '-300px',
  },
  enter: {
    top: '-100vh',
    transition: {duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1]},
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '-300px',
    transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1]},
  },
}

export const translateBg = {
  initial: {
    top: '0',
  },
  enter: {
    top: '-100vh',
    transition: {duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1]},
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '0', // Keep moving ahead instead of resetting back
    transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1]},
  },
}

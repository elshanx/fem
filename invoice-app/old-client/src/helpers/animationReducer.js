const animationReducer = (state = {}, { type }) => {
  switch (type) {
    case 'mobile':
      return {
        state: {
          initial: { x: -300 },
          animate: { x: 800, transition: { duration: 0.6 } },
          exit: { x: -800, transition: { duration: 0.6 } },
        },
      };
    case 'tablet':
      return {
        state: {
          initial: { x: -500, transition: { duration: 0.5 } },
          animate: { x: 800, transition: { duration: 0.6 } },
          exit: { x: -800, transition: { duration: 0.5 } },
        },
      };
    case 'desktop':
      return {
        state: {
          initial: { x: -100 },
          animate: { x: 880, transition: { duration: 0.4 } },
          exit: { x: -600, transition: { duration: 0.5 } },
        },
      };
    default:
      return state;
  }
};

export default animationReducer;

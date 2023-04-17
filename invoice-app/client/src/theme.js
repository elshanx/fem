const sharedStyles = {
  paid: '51, 214, 159',
  pending: '255, 143, 0',
  draft: '55, 59, 83'
};

const sharedButtons = {
  secondBg: '#7C5DFA',
  secondFg: '#FFFFFF',
  secondHoverBg: '#9277FF',
  secondHoverFg: '#FFFFFF',
  fifthBg: '#ec5757',
  fifthFg: '#fff',
  fifthHoverBg: '#FF9797',
  fifthHoverFg: '#fff',
  sixthBg: '#F9FAFE',
  sixthFg: '#7E88C3',
  sixthHoverBg: '#DFE3FA',
  sixthHoverFg: '#7E88C3'
};

export const lightTheme = {
  id: 'light',
  sidebarBg: '#373B53',
  bg: '#F8F8FB',
  bgOnActiveDrawer: '#7C7C7E',
  invoiceBg: '#fff',
  invoiceFg: '#0C0E16',
  invoiceDetails: {
    text: { fg: '#7e88c3' },
    bg: '#F9FAFE'
  },
  drawerBg: '#fff',
  text: '#0C0E16',
  label: '#858BB2',
  formInputBg: '#fff',
  formInputBorderInactive: '1px solid #DFE3FA',
  formInputBorderActive: '1px solid #9277FF',
  formInputTotal: '#fff',
  colorGray: '#888eb0',
  scrollbarColor: '#DFE3FA',
  outlineColor: '#000',
  modal: {
    bg: '#fff',
    fg: '#888EB0'
  },
  invoiceSelect: {
    fg: '#0C0E16',
    bg: '#fff',
    border: '#DFE3FA',
    shadow: 'rgba(72, 84, 159, 0.25))',
    hover: '#7c5dfa'
  },
  invoiceDetailsItemsWrapper: {
    bg: '#F9FAFE'
  },
  invoiceDetailsItemsPrice: {
    fg: '#0C0E16'
  },
  invoiceDetailsProjectDescription: {
    fg: '#0C0E16'
  },
  invoiceSummaryTotal: {
    bg: '#373B53',
    fg: '#fff'
  },
  goBack: {
    fg: '#0C0E16',
    hover: '#7E88C3'
  },
  checkbox: {
    color: '#DFE3FA',
    background: '#DFE3FA',
    border: {
      color: '#7c5dfa'
    }
  },

  ...sharedStyles,

  buttons: {
    ...sharedButtons,
    thirdBg: '#F9FAFE',
    thirdFg: '#7E88C3',
    thirdHoverBg: '#DFE3FA',
    thirdHoverFg: '#7E88C3',
    fourthBg: '#373B53',
    fourthFg: '#888eb0',
    fourthHoverBg: '#0C0E16',
    fourthHoverFg: '#888EB0'
  }
};

export const darkTheme = {
  id: 'dark',
  sidebarBg: '#1E2139',
  bg: '#141625',
  bgOnActiveDrawer: '#0A0B13',
  invoiceBg: '#1E2139',
  invoiceFg: '#fff',
  invoiceDetails: {
    text: { fg: '#DFE3FA' },
    bg: '#252945'
  },
  invoiceSelect: {
    fg: '#fff',
    bg: '#252945',
    border: '#1E2139',
    shadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
    hover: '#1E2139'
  },
  drawerBg: '#141625',
  text: '#fff',
  label: '#DFE3FA',
  formInputBg: '#1E2139',
  formInputBorderInactive: '1px solid #252945',
  formInputBorderActive: '1px solid #252945',
  formInputTotal: '#141625',
  colorGray: '#DFE3FA',
  scrollbarColor: '#252945',
  outlineColor: '#fff',
  modal: {
    bg: '#1E2139',
    fg: '#fff'
  },
  invoiceDetailsItemsWrapper: {
    bg: '#252945'
  },
  invoiceDetailsItemsPrice: {
    fg: '#fff'
  },
  invoiceDetailsProjectDescription: {
    fg: '#fff'
  },
  invoiceSummaryTotal: {
    bg: '#0C0E16',
    fg: '#fff'
  },
  goBack: {
    fg: '#fff'
  },
  checkbox: {
    color: '#1E2139',
    background: '#1e2139',
    border: {
      color: '#7c5dfa'
    }
  },

  ...sharedStyles,

  buttons: {
    ...sharedButtons,
    thirdBg: '#252945',
    thirdFg: '#DFE3FA',
    thirdHoverBg: '#fff',
    thirdHoverFg: '#DFE3FA',
    fourthBg: '#373B53',
    fourthFg: '#888eb0',
    fourthHoverBg: '#1E2139',
    fourthHoverFg: '#DFE3FA'
  }
};

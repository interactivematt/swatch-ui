
export const handlePrimaryColorInputOpen = () => {
    this.setState({ displayPrimaryColorPicker: !this.state.displayPrimaryColorPicker })
  };

export const handlePrimaryColorInputClose = () => {
    this.setState({ displayPrimaryColorPicker: false })
  };

export const handlePrimaryChange = (color) => {
    this.setState({ color_primary: color.hex })
  };

export const handleSecondaryColorInputOpen = () => {
    this.setState({ displaySecondaryColorPicker: !this.state.displaySecondaryColorPicker })
  };

export const handleSecondaryColorInputClose = () => {
    this.setState({ displaySecondaryColorPicker: false })
  };

export const handleSecondaryChange = (color) => {
    this.setState({ color_secondary: color.hex })
  };
(function() {
    const vscode = acquireVsCodeApi();
  
    function getVSCodeColors() {
      const theme = document.body.getAttribute('data-vscode-theme-kind');
      const colorCustomizations = JSON.parse(document.body.getAttribute('data-vscode-color-customizations') || '{}');
  
      const getColor = (color, fallback) => {
        return colorCustomizations[theme]?.[color] || fallback;
      };
  
      return {
        backgroundColor: getColor('editor.background', '#ffffff'),
        foregroundColor: getColor('editor.foreground', '#000000'),
        // Add more colors as needed
      };
    }
  
    function setColors() {
      const colors = getVSCodeColors();
      document.documentElement.style.setProperty('--background-color', colors.backgroundColor);
      document.documentElement.style.setProperty('--foreground-color', colors.foregroundColor);
    }
  
    // Set initial colors
    setColors();
  
    // Update colors on theme change
    window.addEventListener('message', event => {
      if (event.data && event.data.type === 'updateTheme') {
        setColors();
      }
    });
  })();  
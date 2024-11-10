document.addEventListener('keydown', (event) => {
  console.log(event.key, event, event.keyCode);
  // Enter key (13) is commonly used for OK button on remote controls
  // Also checking for OK button specifically (keyCode 79 for 'O' and 75 for 'K')
  if (event.code === 13 || event.key === 'OK' || event.key === 'Enter') {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  }
});

// Keep the double click handler as a fallback for other devices
document.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen().catch((err) => {
      console.error('Error attempting to exit fullscreen:', err);
    });
  }
});

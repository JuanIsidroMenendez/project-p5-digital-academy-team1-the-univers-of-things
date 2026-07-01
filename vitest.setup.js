// Silencia el ExperimentalWarning de localStorage que emite Node al arrancar
// jsdom en cada proceso de test (--localstorage-file no aplica aquí y es
// puramente cosmético, no afecta a ningún resultado de test).
process.removeAllListeners('warning')
process.on('warning', (warning) => {
  if (warning.name === 'ExperimentalWarning' && warning.message.includes('localStorage')) return
  console.warn(warning)
})

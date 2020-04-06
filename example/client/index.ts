google.script.run
    .withSuccessHandler(v => {})
    .withFailureHandler(e => console.error(e))
    .echo("hello gas");;
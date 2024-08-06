
export default import('../dist/FE_DadJokes/server/server.mjs').then((module) => {
    console.log('api dir called', module);
    return module.app();
  });
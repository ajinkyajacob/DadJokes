
export default import('../dist/FE_DadJokes/server/server.mjs').then((module) => {
    return module.app();
  });
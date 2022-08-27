const { ModelOperations } = require("@vscode/vscode-languagedetection");

const modulOperations = new ModelOperations();

module.exports = async function detect(code) {
  const result = await modulOperations.runModel(code);
  return result;
};

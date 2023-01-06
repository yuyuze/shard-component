import { transformSync } from '@babel/core';
const tsToJs = async (content: string): Promise<string> => {
  if (!content) {
    return '';
  }
  const { code } = transformSync(content, {
    configFile: false,
    plugins: [
      [
        require.resolve('@babel/plugin-transform-typescript'),
        {
          isTSX: false,
        },
      ],
    ],
  });
  let output = code;
  output = output ? output.trim() : output;
  return output;
};

export default tsToJs;

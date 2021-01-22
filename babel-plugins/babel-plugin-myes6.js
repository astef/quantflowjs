export default function ({ types: t }) {
  return {
    visitor: {
      BlockStatement(path) {
        // no-op
      },
    },
  };
}

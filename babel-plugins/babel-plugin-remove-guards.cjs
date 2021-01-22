export default function ({ types: t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        if (
          (t.isBlockStatement(path.parent) ||
            t.isProgram(path.parent)) &&
          t.isCallExpression(path.node.expression) &&
          t.isMemberExpression(path.node.expression.callee) &&
          t.isIdentifier(path.node.expression.callee.object) &&
          path.node.expression.callee.object.name === "guard"
        ) {
          path.remove();
        }
      },
    },
  };
}

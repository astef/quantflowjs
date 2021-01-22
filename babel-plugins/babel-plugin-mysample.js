// export default function ({ types: t }) {
//   return {
//     visitor: {
//       BlockStatement(path) {
//         // no-op
//       },
//     },
//   };
// }
module.exports = function () {
  return {
    visitor: {
      BlockStatement(path) {
        // no-op
      },
    },
  };
};

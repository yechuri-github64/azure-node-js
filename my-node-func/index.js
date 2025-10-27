module.exports = async function (context, req) {
  const name = req.query.name || (req.body && req.body.name);
  context.log("Function executed with name:", name);
  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: { message: `Hello, ${name || "World"}! from Azure Function 🚀` }
  };
};

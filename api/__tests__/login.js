const { login } = require("../login");

jest.setTimeout(60000);

test("Login ( Existed User )", async (done) => {
  const res = await login("09391LFa1ypswA0dlnGa1uy5pH391LFE");
  expect(res.openid).toBeDefined();
});

// test("Create user", async (done) => {
//   const res = await createUser("{")
// });

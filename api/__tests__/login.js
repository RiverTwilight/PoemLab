const { login } = require("../login");

jest.setTimeout(60000);

test("Login ( Existed User )", async (done) => {
  const res = await login("013LGOkl2JSEw64s8Gkl2m8CIQ1LGOkO");
  console.log(res);
  expect(res.openid).toBeDefined();
});

// test("Create user", async (done) => {
//   const res = await createUser("{")
// });

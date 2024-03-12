// backend/src/passport.test.js
const passportConfig = require('../config/passport');

describe('Passport tests', () => {
  let passport;

  beforeAll(() => {
    passport = {
      use: jest.fn(),
      serializeUser: jest.fn(),
      deserializeUser: jest.fn()
    };
    passportConfig(passport);
  });

  test('Passport initialization', () => {
    expect(passport.use).toHaveBeenCalled();
    expect(passport.serializeUser).toHaveBeenCalled();
    expect(passport.deserializeUser).toHaveBeenCalled();
  });
});

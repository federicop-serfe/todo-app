const chaiAsPromised = require("chai-as-promised");
const chai = require("chai").use(chaiAsPromised);
const sinon = require("sinon");
const { test, suite, setup, teardown } = require("mocha");

suite("AuthenticationService", function () {
  let user, pass, UserStub, AuthenticationService, ErrorTypes;

  setup(function () {
    user = "testUser";
    pass = "testPass";
    UserStub = {
      findOne: sinon.stub(),
      create: sinon.stub(),
    };
    AuthenticationService =
      require("../../../api/services/AuthenticationService")(UserStub);
    ErrorTypes = require("../../../api/constants/ErrorTypes");
  });

  suite("login", function () {
    teardown(function () {
      sinon.restore();
    });

    test("should throw DB_ERROR when User.findOne throws", async function () {
      UserStub.findOne.rejects(new Error("AdapterError"));

      chai.assert.isRejected(
        AuthenticationService.login(user, pass),
        ErrorTypes.DB_ERROR
      );
    });

    test("should throw INVALID_CREDENTIALS when password does not match", async function () {
      UserStub.findOne.resolves({ user, pass: "wrongPass" });

      chai.assert.isRejected(
        AuthenticationService.login(user, pass),
        ErrorTypes.INVALID_CREDENTIALS
      );
    });

    test("should return user when credentials match", async function () {
      UserStub.findOne.resolves({ user, pass });

      chai.assert.eventually.deepEqual(
        AuthenticationService.login(user, pass),
        { user, pass }
      );
    });
  });

  suite("signup", function () {
    teardown(function () {
      sinon.restore();
    });

    test("should throw DB_ERROR when User.findOne throws", async function () {
      UserStub.findOne.rejects(new Error("AdapterError"));

      chai.assert.isRejected(
        AuthenticationService.signup(user, pass),
        ErrorTypes.DB_ERROR
      );
    });

    test("should throw USER_ALREADY_EXISTS when user already exists", async function () {
      UserStub.findOne.resolves({ user, pass });

      chai.assert.isRejected(
        AuthenticationService.signup(user, pass),
        ErrorTypes.USER_ALREADY_EXISTS
      );
    });

    test("should throw DB_ERROR when User.create fails", async function () {
      UserStub.findOne.resolves(undefined);
      UserStub.create.returns({
        fetch: sinon.stub().rejects(new Error("AdapterError")),
      });

      chai.assert.isRejected(
        AuthenticationService.signup(user, pass),
        ErrorTypes.DB_ERROR
      );
    });

    test("should create new user on successful signup", async function () {
      UserStub.findOne.resolves(undefined);

      chai.assert.isFulfilled(AuthenticationService.signup(user, pass));
      chai.assert(UserStub.findOne.calledOnce);
    });
  });

  suite("logout", function () {});
});

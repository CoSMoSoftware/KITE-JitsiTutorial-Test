const {TestUtils, WebDriverFactory, KiteBaseTest} = require('./node_modules/kite-common'); 
const {OpenUrlStep} = require('./steps');
const {MyFirstCheck} = require('./checks');
const {MainPage} = require('./pages');

// KiteBaseTest config
const globalVariables = TestUtils.getGlobalVariables(process);
const capabilities = require(globalVariables.capabilitiesPath);
const payload = require(globalVariables.payloadPath);

class JitsiTutorial extends KiteBaseTest {
  constructor(name, globalVariables, capabilities, payload) {
    super(name, globalVariables, capabilities, payload);
    this.page = new MainPage();
  }
  
  async testScript() {
    try {
      this.driver = await WebDriverFactory.getDriver(capabilities, capabilities.remoteAddress);

      let openUrlStep = new OpenUrlStep(this);
      await openUrlStep.execute(this);

      let myFirstCheck = new MyFirstCheck(this);
      await myFirstCheck.execute(this);

    } catch (e) {
      console.log(e);
    } finally {
      await this.driver.quit();
    }
  }
}

module.exports= JitsiTutorial;

let test = new JitsiTutorial('JitsiTutorial test', globalVariables, capabilities, payload);
test.run();

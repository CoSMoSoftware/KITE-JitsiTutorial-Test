const {TestUtils, WebDriverFactory, KiteBaseTest} = require('./node_modules/kite-common'); 
const {OpenUrlStep, GetStatsStep, ScreenshotStep} = require('./steps');
const {SentVideoCheck, ReceivedVideoCheck} = require('./checks');
const {MainPage} = require('./pages');

// KiteBaseTest config
const globalVariables = TestUtils.getGlobalVariables(process);
const capabilities = require(globalVariables.capabilitiesPath);
const payload = require(globalVariables.payloadPath);

class JitsiTutorial extends KiteBaseTest {
  constructor(name, globalVariables, capabilities, payload) {
    super(name, globalVariables, capabilities, payload);
  }
  
  async testScript() {
    try {
      this.driver = await WebDriverFactory.getDriver(capabilities, capabilities.remoteAddress);
      this.page = new MainPage(this.driver);

      let openUrlStep = new OpenUrlStep(this);
      await openUrlStep.execute(this);

      let sentVideoCheck = new SentVideoCheck(this);
      await sentVideoCheck.execute(this);

      let receivedVideoCheck = new ReceivedVideoCheck(this);
      await receivedVideoCheck.execute(this);

      if (this.getStats) {
        let getStatsStep = new GetStatsStep(this);
        await getStatsStep.execute(this);
      }

      let screenshotStep = new ScreenshotStep(this);
      await screenshotStep.execute(this);

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

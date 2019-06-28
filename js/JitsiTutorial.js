const {TestUtils, WebDriverFactory, KiteBaseTest, ScreenshotStep} = require('kite-common'); 
const {OpenUrlStep, GetStatsStep} = require('./steps');
const {SentVideoCheck, ReceivedVideoCheck} = require('./checks');
const {MainPage} = require('./pages');

class JitsiTutorial extends KiteBaseTest {
  constructor(name, kiteConfig) {
    super(name, kiteConfig);
  }
  
  async testScript() {
    try {
      this.driver = await WebDriverFactory.getDriver(this.capabilities, this.remoteUrl);
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

      await this.waitAllSteps();
    } catch (e) {
      console.log(e);
    } finally {
      await this.driver.quit();
    }
  }
}

module.exports= JitsiTutorial;


(async () => {
  const kiteConfig= await TestUtils.getKiteConfig(__dirname);
  let test = new JitsiTutorial('JitsiTutorial test', kiteConfig);
  await test.run();
})();

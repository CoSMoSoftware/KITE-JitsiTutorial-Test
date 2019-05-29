package org.webrtc.kite.jitsitutorial;

import org.webrtc.kite.jitsitutorial.checks.ReceivedVideosCheck;
import org.webrtc.kite.jitsitutorial.checks.SentVideoCheck;
import org.webrtc.kite.jitsitutorial.steps.GetStatsStep;
import org.webrtc.kite.jitsitutorial.steps.OpenUrlStep;
import org.webrtc.kite.steps.ScreenshotStep;
import org.webrtc.kite.tests.KiteBaseTest;
import org.webrtc.kite.tests.TestRunner;

public class KiteJitsiTutorialTest extends KiteBaseTest {

  private String url = "https://google.com";

  @Override
  protected void payloadHandling() {
    super.payloadHandling();
    if (this.payload != null) {
      url = payload.getString("url", url);
    }
  }

  @Override
  public void populateTestSteps(TestRunner runner) {
    try {
      runner.addStep(new OpenUrlStep(runner.getWebDriver(), getRoomManager().getRoomUrl()));
      runner.addStep(new SentVideoCheck(runner.getWebDriver()));
      runner.addStep(new ReceivedVideosCheck(runner.getWebDriver(), getMaxUsersPerRoom()));
      runner.addStep(new GetStatsStep(runner.getWebDriver(), getStatsConfig));
      runner.addStep(new ScreenshotStep(runner.getWebDriver()));
    } catch (Exception e) {
      logger.warn(e);
    }
  }
}

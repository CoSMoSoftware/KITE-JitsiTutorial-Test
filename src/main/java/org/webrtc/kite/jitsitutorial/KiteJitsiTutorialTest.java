package org.webrtc.kite.jitsitutorial;

import org.webrtc.kite.jitsitutorial.checks.MyFirstCheck;
import org.webrtc.kite.jitsitutorial.steps.OpenUrlStep;
import org.webrtc.kite.tests.KiteBaseTest;
import org.webrtc.kite.tests.TestRunner;

public class KiteJitsiTutorialTest extends KiteBaseTest {
  
  private String url = "https://google.com";
  
  @Override
  protected void payloadHandling() {
    if (this.payload != null) {
      url = payload.getString("url", url);
    }
  }

  @Override
  public void populateTestSteps(TestRunner runner) {
    runner.addStep(new OpenUrlStep(runner.getWebDriver(), url));
    runner.addStep(new MyFirstCheck(runner.getWebDriver()));
  }

}

package org.webrtc.kite.jitsitutorial.steps;

import io.cosmosoftware.kite.exception.KiteTestException;
import io.cosmosoftware.kite.steps.TestStep;
import org.openqa.selenium.WebDriver;
import org.webrtc.kite.jitsitutorial.pages.MainPage;

public class OpenUrlStep extends TestStep {
  
  private final String url;
  
  
  public OpenUrlStep(WebDriver webDriver, String url) {
    super(webDriver);
    this.url = url;
  }
  
  
  @Override
  public String stepDescription() {
    return "Open " + url;
  }
  
  @Override
  protected void step() throws KiteTestException {
    final MainPage mainPage = new MainPage(this.webDriver, logger);
    mainPage.open(url);
  }
}

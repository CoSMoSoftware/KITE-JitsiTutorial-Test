package org.webrtc.kite.jitsitutorial.pages;

import io.cosmosoftware.kite.pages.BasePage;
import org.apache.log4j.Logger;
import org.openqa.selenium.WebDriver;

import static io.cosmosoftware.kite.util.WebDriverUtils.loadPage;

public class MainPage extends BasePage {
  
  
  public MainPage(WebDriver webDriver, Logger logger) {
    super(webDriver, logger);
  }
  
  public void open(String url) {
    loadPage(webDriver, url, 20);
  }
  
}

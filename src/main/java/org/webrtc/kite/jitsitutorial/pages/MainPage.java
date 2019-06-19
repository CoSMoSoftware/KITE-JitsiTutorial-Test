package org.webrtc.kite.jitsitutorial.pages;

import io.cosmosoftware.kite.interfaces.Runner;
import io.cosmosoftware.kite.pages.BasePage;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static io.cosmosoftware.kite.util.WebDriverUtils.loadPage;

public class MainPage extends BasePage {
  @FindBy(xpath = "//*[@id=\"new-toolbox\"]/div[2]/div[3]/div[1]/div/div") //Find by xPath because id not available
  private WebElement manyTilesVideoToggle; //button to view all videos on meeting page at same size

  @FindBy(tagName = "video")  //Find by tagName
  private List<WebElement> videos;    //List of all the videos on a page

  public MainPage(Runner runner) {
    super(runner);
  }


  public void open(String url) {
    loadPage(webDriver, url, 20);
  }

  public void clickVideoToggle() {    //click manyTilesVideotoggle
    manyTilesVideoToggle.click();
  }

  public void videoIsPublishing(int timeout) throws TimeoutException {  //check video is publishing
    WebDriverWait wait = new WebDriverWait(webDriver, timeout);
    wait.until(ExpectedConditions.visibilityOf(videos.get(0)));
  }

  public int numberOfVideos() { //return number of videos
    return videos.size();
  }

  public List<WebElement> getVideoElements() {  //return list of video elements
    return videos;
  }

  public String getPeerConnectionScript() { //JavaScript code to save peerConnections Object in window.pc
    return "window.pc = [];"
        + "map = APP.conference._room.rtc.peerConnections;"
        + "for(var key of map.keys()){"
        + "  window.pc.push(map.get(key).peerconnection);"
        + "}";
  }
}

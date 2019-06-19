
package org.webrtc.kite.jitsitutorial.steps;

import io.cosmosoftware.kite.exception.KiteTestException;
import io.cosmosoftware.kite.interfaces.Runner;
import io.cosmosoftware.kite.report.Reporter;
import io.cosmosoftware.kite.steps.TestStep;
import org.openqa.selenium.JavascriptExecutor;
import org.webrtc.kite.jitsitutorial.pages.MainPage;

import javax.json.JsonObject;

import static org.webrtc.kite.stats.StatsUtils.extractStats;
import static org.webrtc.kite.stats.StatsUtils.getPCStatOvertime;

public class GetStatsStep extends TestStep {

  private final JsonObject getStatsConfig;
  private final MainPage mainPage;

  public GetStatsStep(Runner runner, JsonObject getStatsConfig) {
    super(runner);
    this.getStatsConfig = getStatsConfig;
    this.mainPage = new MainPage(runner);
  }

  @Override
  public String stepDescription() {
    return "Getting Jitsi conference statistics";
  }

  @Override
  protected void step() throws KiteTestException {
    ((JavascriptExecutor) webDriver).executeScript(mainPage.getPeerConnectionScript()); //1. execute javascript to get save peerConnections
    JsonObject rawStats = getPCStatOvertime(webDriver, getStatsConfig).get(0); //2. return statistics from peer connections
    JsonObject statsSummary = extractStats(rawStats, "both").build(); //3. return processed statistics
    Reporter.getInstance().jsonAttachment(report, "getStatsRaw", rawStats); //4. attach raw stats to report
    Reporter.getInstance().jsonAttachment(report, "getStatsSummary", statsSummary);//4. attach stats to report
  }
}
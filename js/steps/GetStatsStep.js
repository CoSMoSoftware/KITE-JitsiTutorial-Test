const {TestUtils, TestStep, KiteTestError, Status} = require('kite-common');

class GetStatsStep extends TestStep {
  constructor(kiteBaseTest) {
      super();
      this.driver = kiteBaseTest.driver;
      this.statsCollectionTime = kiteBaseTest.statsCollectionTime;
      this.statsCollectionInterval = kiteBaseTest.statsCollectionInterval;
      this.selectedStats = kiteBaseTest.selectedStats;
      this.peerConnections = kiteBaseTest.peerConnections;
      this.page = kiteBaseTest.page;

      // Test reporter if you want to add attachment(s)
      this.testReporter = kiteBaseTest.reporter;
  }

  stepDescription() {
    return 'Getting WebRTC stats via getStats'; 
  }

  async step() {
    try {
        let rawStats = await this.page.getStats(this);
        let summaryStats = TestUtils.extractJson(rawStats, 'both');
        // // Data
        this.testReporter.textAttachment(this.report, 'GetStatsRaw', JSON.stringify(rawStats), "json");
        this.testReporter.textAttachment(this.report, 'GetStatsSummary', JSON.stringify(summaryStats), "json");
    } catch (error) {
        console.log(error);
        throw new KiteTestError(Status.BROKEN, "Failed to getStats");
    }
  }
}

module.exports = GetStatsStep;
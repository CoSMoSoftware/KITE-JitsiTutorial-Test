const {By, Key} = require('selenium-webdriver');
const {TestUtils, KiteTestError, Status} = require('kite-common'); 
const meetingRoom = By.id('enter_room_field');
const videos = By.css('video');

const getPeerConnectionScript = function() {
  return "window.peerConnections = [];"
  + "map = APP.conference._room.rtc.peerConnections;"
  + "for(var key of map.keys()){"
  + "  window.peerConnections.push(map.get(key).peerconnection);"
  + "}";
}

class MainPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await TestUtils.open(url);
  }

  async enterRoom(roomId) {
    let meeting = await this.driver.findElement(meetingRoom);
    await meeting.sendKeys(roomId); // Fill out the field and add some random numbers
    await meeting.sendKeys(Key.ENTER); // Press ENTER to enter in the room
  }

  async videoCheck(stepInfo, index) {
    let checked; // Result of the verification
    let i; // iteration indicator
    let timeout = stepInfo.timeout;
    stepInfo.numberOfParticipant = parseInt(stepInfo.numberOfParticipant) + 1; // To add the first video
    
    // Waiting for all the videos
    await TestUtils.waitForVideos(stepInfo, videos);
    stepInfo.numberOfParticipant --; // To delete the first video

    // Check the status of the video
    // checked.result = 'blank' || 'still' || 'video'
    i = 0;
    checked = await TestUtils.verifyVideoDisplayByIndex(stepInfo.driver, index + 1);
        while(checked.result === 'blank' || typeof checked.result === "undefined" && i < timeout) {
        checked = await TestUtils.verifyVideoDisplayByIndex(stepInfo.driver, index + 1);
        i++;
        await TestUtils.waitAround(1000);
    }

    i = 0;
    while(i < 3 && checked.result != 'video') {
        checked = await TestUtils.verifyVideoDisplayByIndex(stepInfo.driver, index + 1);
        i++;
        await TestUtils.waitAround(3 * 1000); // waiting 3s after each iteration
    }
    return checked.result;
  }

  async getStats(stepInfo) {
    await stepInfo.driver.executeScript(getPeerConnectionScript());
    let stats = await TestUtils.getStats(stepInfo, 'kite', stepInfo.peerConnections[0]);
    return stats;
  }
}

module.exports = MainPage;
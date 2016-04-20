/**
 * Created by bairong on 2016/4/16.
 */
function Planet() {
    var profile = {
        orbitStatus: [false, false, false, false]
    };
    this.launch = function (orbitID, engineType, powerType) {
        if (profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_EXIST, "red");
            return;
        }
        profile.orbitStatus[orbitID - 1] = true;
        SpaceManager.launchSpaceship(orbitID, engineType, powerType);
    };
    this.start = function (orbitID) {
        if (!profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_NOT_EXIST, "red");
            return;
        }
        consoleLog(orbitID, MSG.SEND_START_CMD, "blue");
        BUS.propagation(BROADCAST.PLANET_SRC, Adapter.encoder({
            id: orbitID,
            command: 'fly'
        }));

    };
    this.stop = function (orbitID) {
        if (!profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_NOT_EXIST, "red");
            return;
        }
        consoleLog(orbitID, MSG.SEND_STOP_CMD, "blue");
        BUS.propagation(BROADCAST.PLANET_SRC, Adapter.encoder({
            id: orbitID,
            command: 'stop'
        }));
    };
    this.destroy = function (orbitID) {
        if (!profile.orbitStatus[orbitID - 1]) {
            consoleLog(orbitID, MSG.SHIP_NOT_EXIST, "red");
            return;
        }
        profile.orbitStatus[orbitID - 1] = false;
        consoleLog(orbitID, MSG.SEND_DESTROY_CMD, "blue");
        BUS.propagation(BROADCAST.PLANET_SRC, Adapter.encoder({
            id: orbitID,
            command: "destroy"
        }));

    };

}
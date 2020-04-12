var OP1 = {
    //
    REC: 38,
    PLAY: 39,
    STOP: 40,
    //
    S3: 52,
    //CC
    LOWEST_CC: 2,
    HIGHEST_CC: 129,
    //
    METRONOME: 6,
    metronomeState: false
};

loadAPI(1);
host.defineController("Teenage Engineering", "OP-1 (AQ Version)", "1.0", "77FAB901-07F7-4ED5-99F1-51A922FB4A8A");
host.defineMidiPorts(1, 0);

function init() {
    host.getMidiInPort(0).setMidiCallback(onMidi);
    host.getMidiInPort(0).createNoteInput("Notes");
    userControls = host.createUserControls(OP1.HIGHEST_CC - OP1.LOWEST_CC + 1);
    for (var i = OP1.LOWEST_CC; i <= OP1.HIGHEST_CC; i++) {
        userControls.getControl(i - OP1.LOWEST_CC).setLabel("CC" + i);
    }
    transport = host.createTransport();
}


function onMidi(status, data1, data2) {
    println(status + " " + data1 + " " + data2);

    if (data2 > 0) {
        switch (data1) {
            case OP1.S3:
                transport.toggleLoop();
                break;

            case OP1.REC:
                transport.record();
                break;

            case OP1.PLAY:
                transport.play();
                break;

            case OP1.STOP:
                transport.stop();
                break;

            case OP1.METRONOME:
                transport.toggleClick();
                break;
        }
    }

    if (isChannelController(status)) {
        if (data1 >= OP1.LOWEST_CC && data1 <= OP1.HIGHEST_CC) {
            userControls.getControl(data1 - OP1.LOWEST_CC).set(data2, 128);
        }
    }
}
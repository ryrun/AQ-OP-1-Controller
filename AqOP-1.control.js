var OP1 = {
    //
    REC: 38,
    PLAY: 39,
    STOP: 40,
    //
    S3: 52,
    //
    METRONOME: 6,
    metronomeState: false
};

loadAPI(6);
host.defineController("Teenage Engineering", "OP-1 (AQ Version)", "1.0", "77FAB901-07F7-4ED5-99F1-51A922FB4A8A");
host.defineMidiPorts(1, 0);

function init() {
    prefs = host.getPreferences();
    allChannels = host.getMidiInPort(0);
    notes = allChannels.createNoteInput("Midi Notes", "8?????", "9?????", "D?????", "E?????", "A?????");
    notes.setShouldConsumeEvents(false);
    transport = host.createTransport();
    allChannels.setMidiCallback(onMidi);
}


function onMidi(status, data1, data2) {
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
}
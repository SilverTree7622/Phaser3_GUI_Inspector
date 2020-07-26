/*
    this script is only for complicated relations
    like SideGUI and Input manager
*/

'use strict';

export let JOINT_SI = {
    side: undefined,
    input: undefined,
    // method
    setSide: function (_side) {
        this.side = _side;
    },
    setInput: function (_input) {
        this.input = _input;
    },
    signalInput2Side: function (_idx) {
        if (this.side) {
            this.side.signalFromInput(_idx);
        }
    }
};

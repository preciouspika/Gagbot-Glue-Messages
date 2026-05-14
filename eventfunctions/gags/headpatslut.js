const { getOption } = require("../../functions/configfunctions");
const { getUserVar, setUserVar } = require("../../functions/usercontext");

// Successful headpats will recharge the battery on the recipient's vibe by 5%. Each minute drains 2%. 
function headpatfunction(recipient, headpatter, returnedobject) {
    setUserVar(recipient, "headpatslutgag", Date.now() + (300000 * getOption(recipient, "headpatrestraintpotency")));
}

// Update battery
async function functiontick(userid) {
    if (returnedobject.hit) {
        if (getUserVar(userid, "headpatslutgag") && (getUserVar(userid, "headpatslutgag") < Date.now())) {
            setUserVar(userid, "headpatslutgag", undefined);
        }
    }
}

exports.functiontick = functiontick;
exports.headpatfunction = headpatfunction;
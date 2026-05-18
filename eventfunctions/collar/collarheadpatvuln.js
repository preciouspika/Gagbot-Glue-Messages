const { getCollar } = require("../../functions/collarfunctions");
const { assignGag } = require("../../functions/gagfunctions");
const { messageSendChannel } = require("../../functions/messagefunctions");
const { getPronouns } = require("../../functions/pronounfunctions");
const { getTextGeneric } = require("../../functions/textfunctions");
const { getUserVar, setUserVar } = require("../../functions/usercontext");

// Since headpats can only ever crit if they hit, then we should just simply check for that! 
function headpatfunction(recipient, headpatter, returnedobject) {
    const critheadpatmessages = [
        `The headpat felt so good that it left <@${recipient}> stunned for a few moments! One could capitalize on this opportunity to further bind ${getPronouns(recipient, "object")}!`,
        `<@${recipient}>'s eyes are a bit hazy as ${getPronouns(recipient, "subject")} is lost in thought after that headpat. ${getPronouns(recipient, "subject", true)} could probably easily be bound right now...`
    ]
    if (returnedobject && returnedobject.crit && !getUserVar(recipient, "headpatvulntimer")) {
        messageSendChannel(critheadpatmessages[Math.floor(Math.random() * critheadpatmessages.length)], process.recentmessages[recipient])
        setUserVar(recipient, "headpatvulntimer", Date.now() + 300000)
        if (getCollar(recipient).keyholder_only) {
            getCollar(recipient).headpatvulnerable = (Date.now() + 300000);
        }
    }
}

// Clear crit cooldown if we somehow crashed. 
async function tick(userid, data) {
    if (getUserVar(userid, "headpatvulntimer") && (Date.now() > getUserVar(userid, "headpatvulntimer"))) {
        setUserVar(userid, "headpatvulntimer", undefined);
    }
    if (getCollar(recipient).headpatvulnerable < Date.now()) {
        getCollar(recipient).headpatvulnerable = undefined;
    }
}

exports.tick = tick;
exports.headpatfunction = headpatfunction;
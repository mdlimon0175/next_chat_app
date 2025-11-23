import MediaType from "enum/MediaType";

export const conversationPartnerInfo = (participants, auth_id) => {
  return participants.find(p => p.id !== auth_id);
}

export const isValidUserInfo = (value) => {
    const strValue = String(value).toLowerCase();
    const isEmail = strValue.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const isUsername = strValue.match(/^[a-zA-Z0-9_]+$/) && value.length >= 3;
    return {isEmail: Boolean(isEmail), isUsername: Boolean(isUsername)};
}

export const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(id)
}

export const checkBoolString = (value) => {
    if(typeof value === "string") {
        return value.toLowerCase() === "true";
    } else if(typeof value === "boolean") {
        return value
    } else {
        return false
    }
}

export const defaultMediaQueryString = () => {
    return `${MediaType.VIDEO}=false&${MediaType.AUDIO}=false`
}
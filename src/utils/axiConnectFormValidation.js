// This Regex test for host should be double-checked
const validateHost = (host) => {
  let pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return pattern.test(host);
}

// This Regex test for port should be double-checked
const validatePort = (port) => {
  let pattern = /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/;
  return pattern.test(port);
}

export const validateConnectionParams = (address) => {
  if (!address.host || !address.port) {
    return false;
  }

  return validateHost(address.host) && validatePort(address.port);
}

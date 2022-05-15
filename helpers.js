const generateRandomFilename = () => {
  return `${savePath}/${tmp[tmp.length - 1]}`;
};

// SoundCloud Track URL verification regex pattern
const SC_URL_PATTERN = /^https:\/\/soundcloud.com\/([-a-z\d])+\/([-a-z\d]+)/ig;

const CLI_USAGE_ERROR_MSG =
"\n\033[4;33m         USAGE         \033[0m\n\n" +
"    \033[;35msoundcloud-dl <link for SoundCloud track>\033[0m\n\n\n\n";

const CLI_PATH_ERROR_MSG =
"\n\033[;31mURL Provided save path is not valid\033[0m\n\n" +
"\n\033[4;33m         USAGE         \033[0m\n\n" +
"    \033[;35msoundcloud-dl <link for SoundCloud track>\033[0m\n\n\n\n";

const SC_URL_PATTERN_MSG =
  "\n\033[;31mURL Provided is not a valid SoundCloud track URL\033[0m\n\n" +
  "\033[4;33m         USAGE EXAMPLE         \033[0m\n\n" +
  "    \033[;35msoundcloud-dl https://soundcloud.com/rashidaliofficial/bhangra-loco\033[0m\n\n\n\n";


const CLIENT_ID_ERROR_MSG =
"\n\033[;31mClient ID not found\033[0m\n\n" +
"\033[;33mSet SC_CLIENT_ID environmental variable OR run soundcloud-dl as follows\033[0m\n\n" +
"\033[;35mSC_CLIENT_ID='your client id' soundcloud-dl https://soundcloud.com/rashidaliofficial/bhangra-loco\033[0m\n\n\n";

module.exports = {
  SC_URL_PATTERN,
  SC_URL_PATTERN_MSG,
  CLI_USAGE_ERROR_MSG,
  CLIENT_ID_ERROR_MSG,
  CLI_PATH_ERROR_MSG,
  generateRandomFilename
};
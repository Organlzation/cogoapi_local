import accounts_delete from "./accounts/delete";
import accounts_group_join from "./accounts/group/join";
import accounts_profile_describes_set from "./accounts/profile/describes/set";
import accounts_profile_get from "./accounts/profile/get";
import accounts_profile_set from "./accounts/profile/set";
import accounts_signin from "./accounts/signin";
import accounts_signup from "./accounts/signup";
import freeboard_save from "./freeboard/save";
import problems_submit from "./problems/submit";
import xsrfToken from "./xsrfToken";

const api = {
  xsrfToken: xsrfToken,
  problems: {
    submit: problems_submit,
  },
  freeboard: {
    save: freeboard_save,
  },
  accounts: {
    signup: accounts_signup,
    signin: accounts_signin,
    delete: accounts_delete,
    group: {
      join: accounts_group_join,
    },
    profile: {
      describes: {
        set: accounts_profile_describes_set,
      },
      set: accounts_profile_set,
      get: accounts_profile_get,
    },
  },
};

export default api;

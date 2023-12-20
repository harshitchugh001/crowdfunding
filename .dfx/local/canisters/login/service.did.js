export const idlFactory = ({ IDL }) => {
  const userdetails = IDL.Record({
    'firstname' : IDL.Text,
    'userEmail' : IDL.Text,
    'username' : IDL.Text,
    'userId' : IDL.Text,
    'investedId' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'userImage' : IDL.Text,
    'nationality' : IDL.Text,
    'phonenumber' : IDL.Text,
    'linkedInid' : IDL.Text,
    'projectsId' : IDL.Vec(IDL.Text),
    'qualification' : IDL.Text,
    'lastname' : IDL.Text,
  });
  const userlogin = IDL.Record({
    'userEmail' : IDL.Text,
    'userPassword' : IDL.Text,
  });
  const UserInfo = IDL.Record({
    'userName' : IDL.Text,
    'userEmail' : IDL.Text,
    'userPassword' : IDL.Text,
    'userConfirmPassword' : IDL.Text,
  });
  const Login = IDL.Service({
    'addprojectId' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'getuserdetail' : IDL.Func([IDL.Text], [IDL.Opt(userdetails)], []),
    'login' : IDL.Func([userlogin], [IDL.Text], []),
    'signUp' : IDL.Func([UserInfo], [IDL.Text], []),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'userdetail' : IDL.Func([IDL.Text, userdetails], [IDL.Text], []),
  });
  return Login;
};
export const init = ({ IDL }) => { return []; };

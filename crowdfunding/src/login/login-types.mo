import Text "mo:base/Text";
import HashMap "mo:base/HashMap";


module{
    public type UserInfo = {
    userName : Text;
    userEmail : Text;
    userPassword : Text;
    userConfirmPassword : Text;
  };
  public type storedUserInfo = {
    userId:Text;
    userName : Text;
    userEmail : Text;
    userPassword : Text;
  };

  public type userlogin ={
    userEmail:Text;
    userPassword:Text;
  };

 public type userdetails = {
        userId:Text;
        username:Text;
        firstname:Text;
        lastname:Text;
        description:Text;
        phonenumber:Text;
        userEmail:Text;
        nationality:Text;
        projectsId: [Text];
        investedId: [Text];
        userImage:Text;
        qualification:Text;
        linkedInid:Text;  
    };
}